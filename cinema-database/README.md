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

## Caching Plan

Caching can reduce database load and improve application performance.

| Data | Cache Duration | Cache Invalidation |
|------|----------------|-------------------|
| Movie list | 5 minutes | When a movie is added, updated, or deleted. |
| Latest movies | 10 minutes | When a movie is added or its release date changes. |
| Today's screenings | 1 minute | When a screening is added, updated, or deleted. |
| Available seats | 10 seconds | When a ticket is booked or a booking is cancelled. |
| Latest news | 5 minutes | When a news article is added, updated, or deleted. |

### Future Implementation

Redis can be used in the future to implement caching.

The caching system is currently planned but not implemented.