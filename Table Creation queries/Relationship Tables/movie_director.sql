CREATE TABLE IF NOT EXISTS movie_director (
    movie_id int REFERENCES movie(movie_id),
    director_id int REFERENCES director(director_id),
    PRIMARY KEY (movie_id, director_id)
);