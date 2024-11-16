CREATE TABLE IF NOT EXISTS genre (
    genre_id SERIAL PRIMARY KEY,
    name varchar(255) UNIQUE
);