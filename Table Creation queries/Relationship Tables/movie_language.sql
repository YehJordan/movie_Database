CREATE TABLE IF NOT EXISTS movie_lang(
    movie_id int REFERENCES movie(movie_id),
    language_id int REFERENCES lang(language_id),
    PRIMARY KEY (movie_id, language_id)
);