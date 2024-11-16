CREATE TABLE IF NOT EXISTS movie_actor (
    movie_id int REFERENCES movie(movie_id),
    actor_id int REFERENCES actor(actor_id),
    PRIMARY KEY (movie_id, actor_id)
);