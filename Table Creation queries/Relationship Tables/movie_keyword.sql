CREATE TABLE IF NOT EXISTS movie_keyword (
    movie_id int REFERENCES movie(movie_id),
    keyword_id int REFERENCES keyword(keyword_id),
    PRIMARY KEY (movie_id, keyword_id)
);