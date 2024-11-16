MOVIE DATABASE

This project is a Movie Database that stores detailed information about movies, including movie-specific data like TMDB ID, IMDB ID, title, plot, and content ratings. It also handles relationships between movies and actors, directors, genres, languages, countries, and keywords. Additionally, the system allows for querying various movie details and batch updates to handle specific data operations. It makes use of the public API IMDbOT

Here is a link to the IMDbOT github: https://github.com/TelegramPlayGround/Free-Movie-Series-DB-API

- Technologies Used
PostgreSQL: The primary database used to store movie-related data.
Node.js: Server-side runtime environment for handling API requests and database operations.
Axios: For HTTP requests to external services (e.g., TMDB, IMDB).
pg (node-postgres): PostgreSQL client for Node.js.

To install these dependencies, please enter 'npm i' in your terminal

- Connection to your Postgre Server

At the start of the database.js file, you can modify the credentials with your postgre credentials to run on your localhost.
With this, you should be able to create a database instance via the database client pg for node.js

- Database Schema

The database consists of several tables to handle different entities and their relationships:

Movie: Stores information like tmdb_ID, imdb_ID, title, plot, releaseYear, etc.
Actor, Director, Genre, Language, Country, Keyword: Store movie-related entities.
Content Rating: Stores content ratings for movies.
Relationship Tables: Link movies to actors, directors, genres, keywords, content ratings, and languages.

You can view an ERD diagram within the ERD Diagram folder containing a png of it.

By viewing the dbCreation.sql file, you can see (and run) a more detailed version of the schema.

OR alternatively

Open the Table Creation queries folder to view them individually.

- Database Population

I have written a few keywords to fetch some movie data with the IMDbOT. You may change the line 292 to your liking to change the search keywords.

There are 2 GET methods that uses the public API IMDbOT to fetch movie data.

To populate the tables, Please write 'node database' or 'node database.js' within your terminal after you have installed the dependencies.
By default, after running the script, it should slowly populate the database with 58 movies.
Please view the populationQueries.txt to view the queries used to populate the tables or view them directly within the database.js file

You can view the database.js file directly or view the populationQueries.txt for the queries used.


- Pre-Written Queries

I have written some queries you can run in the queries.sql file. They do the following:

[IN viewCreation]


The viewCreation.sql file creates a view named 'movie-summary' that displays tmdb key,
imdb key, title, description / plot, content rating, number of keywords, number of countries

[IN queries.sql]
A)  Finds the total number of movies with and without IMDB id in the database.
B)  Picks an actor. (modifiable in queries.sql) Finds all movies by that actor that is released between 2000 and
2020. Lists TMDB-id, IMDB-id, movie title, release date, and watchmode-id.
C)  Finds the top movies that have highest number of reviews.
D)  Find number of movies that are in more than one language.
E)  For each language, lists how many movies are there in the database. Ordered by highest rank.
F)  Finds top 2 comedies (higher ratings).
G)  A query that rounds up all the ratings.

[SUMMARY OF SETUP]


1) Clone all files/folders/json onto local device.
2)Install dependencies with your terminal by writing 'npm i' (You also need node.js on your device)
3)Set up your postgre credentials at the start of the 'database.js' file
4) Setup the database by running the queries using the dbCreation.sql file
5) Populate the database by running the database.js script by writing 'node database' in your terminal
6) (Optional) Create the database view by running the queries in viewCreation.sql
6) (Optional) If you want, run the queries found in queries.sql to test the database.
