const axios = require('axios').default;
const { Client } = require('pg');  // PostgreSQL client

// Set up PostgreSQL client
const client = new Client({
  user: 'postgres',        // Replace with your user name
  host: 'localhost',       // Replace with your host
  database: 'my_database', // Replace with your database name
  password: 'Placeholder',  // Replace with your actual password
  port: 5432, //Use port of your choice
});

async function fetchMoviesByName(movie_name) {
  const options = {
    method: 'GET',
    url: 'https://imdb.iamidiotareyoutoo.com/search',
    params: { q: movie_name },  // Search by keyword instead of IMDb ID
  };

  try {
    const { data } = await axios.request(options);
    return data;  // Adjust based on actual response structure
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

async function fetchMovieByID(imdbId) {
  const options = {
    method: 'GET',
    url: 'https://imdb.iamidiotareyoutoo.com/search',
    params: { tt: imdbId },
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

// The following methods contain DML Queries that help populate the tables.

async function saveMovieToDatabase(movieData) {
  const query = 'INSERT INTO movie (imdb_ID, title, aka, plot, viewerRating, releaseYear, reviewCount) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING movie_id'; //Query that populates movie table
  const values = [
    movieData.imdb_ID, //$1
    movieData.title, //$2
    movieData.aka || null, //$3
    movieData.plot, //$4
    movieData.viewerRating, //$5
    movieData.releaseYear, //$6
    movieData.reviewCount, //$7
  ];

  try {
    const res = await client.query(query, values);
    console.log('Movie saved to database:', movieData.title);
    const movie_id = res.rows[0].movie_id; // getting the serial movie ID
    return movie_id;
  } catch (err) {
    console.error('Error saving movie to database:', err);
  }
}

async function saveCountryToDatabase(movieId, country) {
  try {
    
    // Check if the country is given
    if (!country) {
      console.log('No country name provided');
      return; // Exit if no country is provided
    }
    // Insert the country into the country table and get the country_id
    let res = await client.query('INSERT INTO country (country_name) VALUES ($1) ON CONFLICT (country_name) DO NOTHING RETURNING country_id', [country]);

    let countryId;
    if (res.rowCount > 0) {
      // Country was inserted, get the new country_id
      countryId = res.rows[0].country_id;
      console.log(`Inserted new country with ID: ${country}`);
    } else {
      // If country already exists, retrieve its ID
      res = await client.query('SELECT country_id FROM country WHERE country_name = $1', [country]);
      if (res.rowCount > 0) {
        countryId = res.rows[0].country_id;
        console.log(`Found existing country with ID: ${countryId}`);
      } else {
        console.log(`Country not found in database: ${country}`);
        return; // Exit if no country found
      }
    }
    // Insert into movie_country relationship table
    await client.query('INSERT INTO movie_country (movie_id, country_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [movieId, countryId]);

    console.log(`Country ${country} associated with movie ID: ${movieId}`);
  } catch (err) {
    console.error('Error saving country to database:', err);
  }
}

async function saveKeywordsToDatabase(movieId, keywords) {
  try {
    // Check if keywords are provided
    if (!keywords) {
      console.log('No keywords provided');
      return; // Exit if no keywords are provided
    }

    // Insert the keyword into the keyword table 
    let res = await client.query('INSERT INTO keyword (keyword) VALUES ($1) RETURNING keyword_id', [keywords]);

    let keywordId;
    if (res.rowCount > 0) {
      // Keyword was inserted, get the new keyword_id
      keywordId = res.rows[0].keyword_id;
      console.log('Inserted keywords for the movie');
    }

    // Insert into movie_keyword relationship table
    await client.query('INSERT INTO movie_keyword (movie_id, keyword_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [movieId, keywordId]);

    console.log(`Keyword "${keywords}" associated with movie ID: ${movieId}`);
  } catch (err) {
    console.error('Error saving keywords to database:', err);
  }
}

async function saveContentRatingToDatabase(movieId, rating) {
  try {
    // Check if content rating is provided
    if (!rating) {
      console.log('No content rating provided');
      return; // Exit if no content rating is provided
    }

    // Insert the content rating into the content rating table 
    let res = await client.query('INSERT INTO content_rating (content_rating) VALUES ($1) RETURNING content_rating_id', [rating]);

    let contentRatingId;
    if (res.rowCount > 0) {
      // content rating was inserted, get the new content_rating_id
      contentRatingId = res.rows[0].content_rating_id;
      console.log('Inserted content rating for the movie');
    }

    // Insert into movie_content_rating relationship table
    await client.query('INSERT INTO movie_content_rating (movie_id, content_rating_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [movieId, contentRatingId]);

    console.log(`Content rating "${rating}" associated with movie ID: ${movieId}`);
  } catch (err) {
    console.error('Error saving content rating to database:', err);
  }
}

async function saveLanguageToDatabase(movieId, lang) {
  try {
    // Check if the language is given
    if (!lang) {
      console.log('No language provided');
      return; // Exit if no country is provided
    }
    // Insert the country into the country table and get the country_id
    let res = await client.query('INSERT INTO lang (language_name) VALUES ($1) ON CONFLICT (language_name) DO NOTHING RETURNING language_id', [lang]);

    let langId;
    if (res.rowCount > 0) {
      // Language was inserted, get the new language_id
      langId = res.rows[0].language_id;
      console.log(`Inserted new language with ID: ${lang}`);
    } else {
      // If language already exists, retrieve its ID
      res = await client.query('SELECT language_id FROM lang WHERE language_name = $1', [lang]);
      if (res.rowCount > 0) {
        langId = res.rows[0].language_id;
        console.log(`Found existing language with ID: ${langId}`);
      } else {
        console.log(`language not found in database: ${lang}`);
        return; // Exit if no language found
      }
    }
    // Insert into movie_lang relationship table
    await client.query('INSERT INTO movie_lang (movie_id, language_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [movieId, langId]);

    console.log(`Language ${lang} associated with movie ID: ${movieId}`);
  } catch (err) {
    console.error('Error saving language to database:', err);
  }
}

async function saveActorsToDatabase(movieId, actors) {
  try {

    // Check if actors are given
    if (!actors) {
      console.log('No actor provided');
      return; // Exit if no actor is provided
    }

    // Insert actors into the actor table and collect actor_ids
    const actorIds = [];
    for (const actor of actors) {
      let res = await client.query('INSERT INTO actor (actor_name) VALUES ($1) ON CONFLICT (actor_name) DO NOTHING RETURNING actor_id', [actor.name]);

      if (res.rowCount > 0) {
        actorIds.push(res.rows[0].actor_id);
      } else {
        // If actor already exists, retrieve its ID with matching actor_name in table
        res = await client.query('SELECT actor_id FROM actor WHERE actor_name = $1', [actor.name]);
        actorIds.push(res.rows[0].actor_id);
      }
    }

    // Insert into movie_actor relationship table
    for (const actorId of actorIds) {
      await client.query('INSERT INTO movie_actor (movie_id, actor_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [movieId, actorId]);
    }
    console.log(`Actor saved for movie ID: ${movieId}`);
  } catch (err) {
    console.error('Error saving actors to database:', err);
  }
}

async function saveDirectortoDatabase(movieId, directorName) {
  try {
    // Check if the directorName is valid
    if (!directorName) {
      console.log('No director name provided');
      return; // Exit if no director name is provided
    }

    // Insert the director into the director table and get the director_id
    let res = await client.query('INSERT INTO director (director_name) VALUES ($1) ON CONFLICT (director_name) DO NOTHING RETURNING director_id', [directorName]);

    let directorId;
    if (res.rowCount > 0) {
      // Director was inserted, get the new director_id
      directorId = res.rows[0].director_id;
      console.log(`Inserted new director with ID: ${directorId}`);
    } else {
      // If director already exists, retrieve its ID
      res = await client.query('SELECT director_id FROM director WHERE director_name = $1', [directorName]);
      if (res.rowCount > 0) {
        directorId = res.rows[0].director_id;
        console.log(`Found existing director with ID: ${directorId}`);
      } else {
        console.log(`Director not found in database: ${directorName}`);
        return; // Exit if no director found
      }
    }

    // Insert into movie_director relationship table
    await client.query('INSERT INTO movie_director (movie_id, director_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [movieId, directorId]);

    console.log(`Director ${directorName} associated with movie ID: ${movieId}`);
  } catch (err) {
    console.error('Error saving director to database:', err);
  }
}

async function saveGenresToDatabase(movieId, genres) {
  try {
    // Insert genres into the genre table and collect genre_ids
    const genreIds = [];
    for (const genre of genres) {
      let res = await client.query('INSERT INTO genre (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING genre_id', [genre]);

      if (res.rowCount > 0) {
        genreIds.push(res.rows[0].genre_id);
      } else {
        // If genre already exists, retrieve its ID with matching genre_name in table
        res = await client.query('SELECT genre_id FROM genre WHERE name = $1', [genre]);
        genreIds.push(res.rows[0].genre_id);
      }
    }

    // Insert into movie_genre relationship table
    for (const genreId of genreIds) {
      await client.query('INSERT INTO movie_genre (movie_id, genre_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [movieId, genreId]);
    }
    console.log(`Genres saved for movie ID: ${movieId}`);
  } catch (err) {
    console.error('Error saving genres to database:', err);
  }
}



const movie_List = ['Avengers', 'Weather', 'Weathering With You', 'Batman', 'Spider-Man', 'dumb', 'ghost', 'Deadpool'];  // Example keywords to search for movies, edit this to your liking */

async function main() {
  try {
    await client.connect();
    
    for(const movie_name of movie_List){
      const movieResults = await fetchMoviesByName(movie_name);

      // Access the 'description' attribute in the JSON, which holds the array of movies
      const movies = Array.isArray(movieResults.description) ? movieResults.description : [];

      for (const movie of movies) {
        // Extract IMDb ID directly 
        const imdb_ID = movie['#IMDB_URL'].split('/title/')[1].replace('/', '');
        const movieByID = await fetchMovieByID(imdb_ID);
        const movieData = {
          imdb_ID,
          title: movie['#TITLE'],
          aka: movie['#AKA'] || null,
          plot: movieByID.short.description,
          viewerRating: null || movieByID.short.aggregateRating?.ratingValue || null,
          releaseYear: movie['#YEAR'],
          reviewCount: movieByID.top.reviews.total,
        };
        //ACTOR
        const actorData = movieByID.short.actor || null;

        //DIRECTOR
        const directorData = {
          director_name: movieByID?.short?.director?.[0]?.name || null,
        };

        //COUNTRY
        const countryData = {country_name: movieByID?.main.countriesOfOrigin?.countries?.[0]?.text || null,
        };

        
        //KEYWORD
        const keywords = {
          keyword: movieByID.short.keywords || null,
        };

        //GENRE
        const genreData = movieByID.short.genre;

        //CONTENT RATING
        const CRData = movieByID.short.contentRating;

        //LANGUAGE
        const langData = movieByID.main.spokenLanguages.spokenLanguages[0].id;
       
        
        serial_movie_id = await saveMovieToDatabase(movieData);
        await saveGenresToDatabase(serial_movie_id, genreData);
        await saveKeywordsToDatabase(serial_movie_id, keywords.keyword);
        await saveActorsToDatabase(serial_movie_id, actorData)
        await saveDirectortoDatabase(serial_movie_id, directorData.director_name);
        await saveCountryToDatabase(serial_movie_id, countryData.country_name);
        await saveContentRatingToDatabase(serial_movie_id, CRData);
        await saveLanguageToDatabase(serial_movie_id, langData);
        console.log();
      }
    }
  } finally {
    await client.end();
  }
}

main();
