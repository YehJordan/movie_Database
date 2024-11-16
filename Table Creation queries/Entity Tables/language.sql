CREATE TABLE IF NOT EXISTS lang (
    language_id SERIAL PRIMARY KEY,
    language_name varchar(255) UNIQUE
);