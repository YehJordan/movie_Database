CREATE TABLE IF NOT EXISTS director (
    director_id SERIAL PRIMARY KEY,
    director_name varchar(255) UNIQUE
);