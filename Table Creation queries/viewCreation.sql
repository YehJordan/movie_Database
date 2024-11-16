--QUERY TO CREATE THE VIEW

DROP VIEW IF EXISTS movie_summary;

CREATE VIEW movie_summary AS
SELECT 
    m.tmdb_id AS tmdb_key,
    m.imdb_id AS imdb_key,
    m.title,
    m.plot AS description,
    cr.content_rating AS content_rating,
    m.viewerRating,
    --m.movie_length, (if it existed to display movie runtime)
    (SELECT COUNT(*) 
     FROM movie_keyword mk 
     WHERE mk.movie_id = m.movie_id) AS number_of_keywords,
    (SELECT COUNT(*) 
     FROM movie_country mc 
     WHERE mc.movie_id = m.movie_id) AS number_of_countries
FROM 
    movie m
LEFT JOIN 
    movie_content_rating mcr ON m.movie_id = mcr.movie_id
LEFT JOIN 
    content_rating cr ON mcr.content_rating_id = cr.content_rating_id;
