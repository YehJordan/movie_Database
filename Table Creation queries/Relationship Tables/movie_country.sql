CREATE TABLE IF NOT EXISTS movie_country (
    movie_id int REFERENCES movie(movie_id),
    country_id int REFERENCES country(country_id),
    PRIMARY KEY (movie_id, country_id)
); 