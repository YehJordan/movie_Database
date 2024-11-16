CREATE TABLE IF NOT EXISTS actor (
    actor_id SERIAL PRIMARY KEY,
    actor_name varchar(255) UNIQUE
);