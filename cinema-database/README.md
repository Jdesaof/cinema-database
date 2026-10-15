## Database Indexes

Database indexes have been added using Prisma ORM to improve query performance and speed up searching, filtering, and sorting.

| Table | Column | Purpose |
|-------|--------|---------|
| movies | title | Speeds up movie searches by title. |
| movies | release_date | Improves sorting movies by release date. |
| screenings | starts_at | Speeds up searching for upcoming screenings. |
| screenings | movie_id, starts_at | Improves searching and sorting screenings for a specific movie by start time. |
| news | published_at | Speeds up sorting news by publication date. |

All indexes are defined in `prisma/schema.prisma` and applied through Prisma migrations.

## Database Optimization

### Indexes

The database uses indexes to improve query performance.

Examples:
- movies_title_idx
- movies_release_date_idx
- screenings_starts_at_idx
- screenings_movie_id_starts_at_idx

Index usage was verified using SQL EXPLAIN.

### Redis Caching

Redis is used to cache movie data and reduce database queries.

Endpoint:
GET /movies

The first request retrieves movies from MariaDB.
Subsequent requests retrieve cached data from Redis.

### Performance Test

| Source | Response Time |
|--------|---------------|
| MariaDB | 122.3 ms |
| Redis | 6.6 ms |

In this test, the cached response was approximately
18.4 times faster than the database response.

Note: Results are based on a single comparison
and may vary between requests.
