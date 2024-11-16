CREATE TABLE IF NOT EXISTS movie_genre (
    movie_id int REFERENCES movie(movie_id),
    genre_id int REFERENCES genre(genre_id),
    PRIMARY KEY (movie_id, genre_id)
);