--QUERIES TO CREATE THE DATABASE

--Reset tables comment these out to avoid reseting the entire database 
DROP VIEW IF EXISTS movie_summary;
DROP TABLE IF EXISTS movie_country;
DROP TABLE IF EXISTS movie_genre;
DROP TABLE IF EXISTS movie_director;
DROP TABLE IF EXISTS movie_actor;
DROP TABLE IF EXISTS movie_keyword;
DROP TABLE IF EXISTS movie_content_rating;
DROP TABLE IF EXISTS movie_lang;
DROP TABLE IF EXISTS genre;
DROP TABLE IF EXISTS keyword;
DROP TABLE IF EXISTS country;
DROP TABLE IF EXISTS director;
DROP TABLE IF EXISTS actor;
DROP TABLE IF EXISTS lang;
DROP TABLE IF EXISTS content_rating;
DROP TABLE IF EXISTS movie;

--Entity Tables

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

CREATE TABLE IF NOT EXISTS content_rating (
    content_rating_id SERIAL PRIMARY KEY,
    content_rating varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS actor (
    actor_id SERIAL PRIMARY KEY,
    actor_name varchar(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS director (
    director_id SERIAL PRIMARY KEY,
    director_name varchar(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS lang (
    language_id SERIAL PRIMARY KEY,
    language_name varchar(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS country (
    country_id SERIAL PRIMARY KEY,
    country_name varchar(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS keyword (
    keyword_id SERIAL PRIMARY KEY,
    keyword varchar(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS genre (
    genre_id SERIAL PRIMARY KEY,
    name varchar(255) UNIQUE
);

--Relationship Tables

CREATE TABLE IF NOT EXISTS movie_actor (
    movie_id int REFERENCES movie(movie_id),
    actor_id int REFERENCES actor(actor_id),
    PRIMARY KEY (movie_id, actor_id)
);

CREATE TABLE IF NOT EXISTS movie_director (
    movie_id int REFERENCES movie(movie_id),
    director_id int REFERENCES director(director_id),
    PRIMARY KEY (movie_id, director_id)
);

CREATE TABLE IF NOT EXISTS movie_genre (
    movie_id int REFERENCES movie(movie_id),
    genre_id int REFERENCES genre(genre_id),
    PRIMARY KEY (movie_id, genre_id)
);

CREATE TABLE IF NOT EXISTS movie_country (
    movie_id int REFERENCES movie(movie_id),
    country_id int REFERENCES country(country_id),
    PRIMARY KEY (movie_id, country_id)
); 

CREATE TABLE IF NOT EXISTS movie_keyword (
    movie_id int REFERENCES movie(movie_id),
    keyword_id int REFERENCES keyword(keyword_id),
    PRIMARY KEY (movie_id, keyword_id)
);

CREATE TABLE IF NOT EXISTS movie_content_rating(
    movie_id int REFERENCES movie(movie_id),
    content_rating_id int REFERENCES content_rating(content_rating_id),
    PRIMARY KEY (movie_id, content_rating_id)
);

CREATE TABLE IF NOT EXISTS movie_lang(
    movie_id int REFERENCES movie(movie_id),
    language_id int REFERENCES lang(language_id),
    PRIMARY KEY (movie_id, language_id)
);