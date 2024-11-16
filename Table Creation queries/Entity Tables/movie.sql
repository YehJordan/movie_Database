CREATE TABLE IF NOT EXISTS movie (
    movie_id SERIAL PRIMARY KEY,
    tmdb_ID SERIAL NOT NULL UNIQUE,
    imdb_ID varchar(255) UNIQUE NOT NULL, -- I have chosen to use IMDB ID as not null instead of tmdb because I am using IMDB bot to fetch data
    title varchar(255),
    AKA varchar(255),
    plot text,
    viewerRating float CHECK (viewerRating >= 0 AND viewerRating <= 10 AND viewerRating::NUMERIC(3,1) = viewerRating),
    releaseYear int,
    watchmode_ID SERIAL,
    reviewCount int
);