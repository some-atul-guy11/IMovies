# IMovies - Server
1. cp .env.example .env
2. npm install
3. npm run seed
4. npm run dev   (http://localhost:5000)

## API
POST /api/auth/register | /login   GET /api/auth/me
GET  /api/movies?search=&genre=    GET /api/movies/:id
POST/PUT/DELETE /api/movies        (admin)
GET  /api/shows/movie/:movieId     GET /api/shows/:id
POST/DELETE /api/shows             (admin)
POST /api/bookings   {showId, seats:["A1","A2"]}
GET  /api/bookings/my              PUT /api/bookings/:id/cancel
