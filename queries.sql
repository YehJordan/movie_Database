
-- QUERY TO FIND NUMBER OF MOVIES WITH IMDB_ID AND WITHOUT IMDB_ID
-- Since i'm using an imdbbot to find movie data, they all have ids. However, this query would be able to find 
-- movies without an imdb id.
SELECT 
    (SELECT COUNT(*) FROM movie WHERE imdb_ID IS NOT NULL) AS with_imdb_id,
    (SELECT COUNT(*) FROM movie WHERE imdb_ID IS NULL) AS without_imdb_id;

-- Query to find all movies by a specific actor between 2000 and 2020.

SELECT 
    tmdb_ID, 
    imdb_ID, 
    title, 
    releaseYear, 
    watchmode_ID
FROM movie
WHERE movie_id IN (
    SELECT movie_id 
    FROM movie_actor 
    WHERE actor_id = (SELECT actor_id FROM actor WHERE actor_name = 'Chris Evans') -- Change name in quotation marks to find different actors.
)
AND releaseYear BETWEEN 2000 AND 2020;

-- Query to find the 3 movies with the highest number of reviews

SELECT 
    title, 
    reviewCount 
FROM movie
WHERE reviewCount IS NOT NULL
ORDER BY reviewCount DESC
LIMIT 3;

-- Query to find movies with more than 1 language
-- IMDbBot does not give languages other than the main one.(Which is why it doesnt display data) However, this query 
-- would handle displaying the movies with more than 1 language. 

SELECT COUNT(DISTINCT m.movie_id) AS multi_language_movies
FROM movie m
JOIN movie_lang ml ON m.movie_id = ml.movie_id
GROUP BY m.movie_id
HAVING COUNT(ml.language_id) > 1;

-- Query to find number of movies per language

SELECT 
    language_name,
    (SELECT COUNT(*) 
     FROM movie_lang 
     WHERE movie_lang.language_id = lang.language_id) AS movie_count
FROM lang
ORDER BY movie_count DESC;

-- Query to find top 2 comedy movies (has at least Comedy as one of its genre)

SELECT 
    title, 
    viewerRating
FROM movie
WHERE movie_id IN (
    SELECT movie_id 
    FROM movie_genre 
    WHERE genre_id = (SELECT genre_id FROM genre WHERE name = 'Comedy')
)
ORDER BY viewerRating DESC
LIMIT 2;

-- Batch-update query that rounds up all ratings

UPDATE movie
SET viewerRating = CEIL(viewerRating);

