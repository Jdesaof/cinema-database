-- CreateIndex
CREATE INDEX `movies_title_idx` ON `movies`(`title`);

-- CreateIndex
CREATE INDEX `movies_release_date_idx` ON `movies`(`release_date`);

-- CreateIndex
CREATE INDEX `news_published_at_idx` ON `news`(`published_at`);

-- CreateIndex
CREATE INDEX `screenings_starts_at_idx` ON `screenings`(`starts_at`);

-- CreateIndex
CREATE INDEX `screenings_movie_id_starts_at_idx` ON `screenings`(`movie_id`, `starts_at`);
