const router = require('express').Router();
const Show = require('../models/Show');
const { protect, adminOnly } = require('../middleware/auth');

// upcoming shows for a movie
router.get('/movie/:movieId', async (req, res) => {
  res.json(await Show.find({ movie: req.params.movieId, showTime: { $gte: new Date() } }).sort('showTime'));
});

// single show with seat availability
router.get('/:id', async (req, res) => {
  const s = await Show.findById(req.params.id).populate('movie');
  s ? res.json(s) : res.status(404).json({ message: 'Show not found' });
});

router.post('/', protect, adminOnly, async (req, res) => res.status(201).json(await Show.create(req.body)));
router.delete('/:id', protect, adminOnly, async (req, res) => {
  await Show.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
