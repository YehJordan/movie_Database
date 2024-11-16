CREATE TABLE IF NOT EXISTS country (
    country_id SERIAL PRIMARY KEY,
    country_name varchar(255) UNIQUE
);