CREATE TABLE IF NOT EXISTS movie_content_rating(
    movie_id int REFERENCES movie(movie_id),
    content_rating_id int REFERENCES content_rating(content_rating_id),
    PRIMARY KEY (movie_id, content_rating_id)
);