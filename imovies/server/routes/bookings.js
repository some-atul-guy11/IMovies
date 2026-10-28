const router = require('express').Router();
const Show = require('../models/Show');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

// create booking (atomic: fails if any seat already taken)
router.post('/', protect, async (req, res) => {
  try {
    const { showId, seats } = req.body;
    if (!showId || !Array.isArray(seats) || !seats.length)
      return res.status(400).json({ message: 'showId and seats required' });

    const show = await Show.findOneAndUpdate(
      { _id: showId, bookedSeats: { $nin: seats } },
      { $addToSet: { bookedSeats: { $each: seats } } },
      { new: true }
    );
    if (!show) return res.status(409).json({ message: 'One or more seats already booked' });

    const booking = await Booking.create({
      user: req.user._id, show: showId, seats, totalAmount: seats.length * show.price
    });
    res.status(201).json(booking);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// my bookings
router.get('/my', protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({ path: 'show', populate: { path: 'movie' } }).sort('-createdAt');
  res.json(bookings);
});

// cancel booking (frees seats)
router.put('/:id/cancel', protect, async (req, res) => {
  const b = await Booking.findOne({ _id: req.params.id, user: req.user._id });
  if (!b || b.status === 'cancelled') return res.status(404).json({ message: 'Booking not found' });
  b.status = 'cancelled';
  await b.save();
  await Show.findByIdAndUpdate(b.show, { $pull: { bookedSeats: { $in: b.seats } } });
  res.json(b);
});

module.exports = router;
