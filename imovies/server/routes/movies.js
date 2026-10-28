const router = require('express').Router();
const Movie = require('../models/Movie');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const { search, genre } = req.query;
  const q = {};
  if (search) q.title = new RegExp(search, 'i');
  if (genre) q.genre = genre;
  res.json(await Movie.find(q).sort('-createdAt'));
});

router.get('/:id', async (req, res) => {
  const m = await Movie.findById(req.params.id);
  m ? res.json(m) : res.status(404).json({ message: 'Movie not found' });
});

router.post('/', protect, adminOnly, async (req, res) => res.status(201).json(await Movie.create(req.body)));
router.put('/:id', protect, adminOnly, async (req, res) =>
  res.json(await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', protect, adminOnly, async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
