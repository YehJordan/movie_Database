CREATE TABLE IF NOT EXISTS keyword (
    keyword_id SERIAL PRIMARY KEY,
    keyword varchar(255) UNIQUE
);