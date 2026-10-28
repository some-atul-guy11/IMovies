// Run: npm run seed  -> creates admin + sample movies/shows
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Movie = require('./models/Movie');
const Show = require('./models/Show');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Promise.all([User.deleteMany(), Movie.deleteMany(), Show.deleteMany()]);
  await User.create({ name: 'Admin', email: 'admin@imovies.com', password: await bcrypt.hash('admin123', 10), role: 'admin' });
  const movies = await Movie.insertMany([
    { title: 'Inception', description: 'A thief enters dreams to steal secrets.', genre: ['Sci-Fi', 'Thriller'], language: 'English', duration: 148, rating: 8.8, poster: 'https://placehold.co/300x450?text=Inception' },
    { title: '3 Idiots', description: 'Three friends, one engineering college.', genre: ['Comedy', 'Drama'], language: 'Hindi', duration: 170, rating: 8.4, poster: 'https://placehold.co/300x450?text=3+Idiots' },
    { title: 'Interstellar', description: 'Explorers travel through a wormhole.', genre: ['Sci-Fi', 'Drama'], language: 'English', duration: 169, rating: 8.7, poster: 'https://placehold.co/300x450?text=Interstellar' }
  ]);
  const day = 86400000;
  for (const m of movies)
    for (const [i, t] of ['PVR Indore', 'INOX Indore'].entries())
      await Show.create({ movie: m._id, theatre: t, showTime: new Date(Date.now() + day * (i + 1)), price: 250 });
  console.log('Seeded. Admin: admin@imovies.com / admin123');
  process.exit();
})();
