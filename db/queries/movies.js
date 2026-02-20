import db from "#db/client";

/** @returns all movies in the database */
export async function getMovies() {
  const sql = `
  SELECT *
  FROM movies
  `;
  const { rows: movies } = await db.query(sql);
  return movies;
}

/** @returns the movie created according to the provided details */
export async function createMovie({ name, releaseDate, runningTime }) {
  // TODO
  try {
    const { rows: [newlyCreatedMovie] } = await db.query(`
      INSERT INTO movies (name, release_date, running_time)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [name, releaseDate, runningTime]);

    console.log(`NEWLY CREATED MOVIE:`, newlyCreatedMovie);
    return newlyCreatedMovie;
  } catch(err) {
    console.log(`ERROR CREATING A MOVIE:`, err);
  }  
}

// === Part 2 ===

/**
 * @returns the movie with the given id
 * @returns undefined if movie with the given id does not exist
 */
export async function getMovie(id) {
  const sql = `
  SELECT * 
  FROM movies
  WHERE id = $1
  `;
  const { rows: [movie] } = await db.query(sql, [id]);
  return movie;
}

/**
 * @returns the updated movie with the given id
 * @returns undefined if movie with the given id does not exist
 */
export async function updateMovie({ id, name, releaseDate, runningTime }) {
  const sql = `
  UPDATE movies
  SET ($2, $3, $4)
  WHERE id = $1
  RETURNING *
  `;
  const { rows: [movie] } = await db.query(sql, [id, name, releaseDate, runningTime]);
  return movie;
}

/**
 * @returns the deleted movie with the given id
 * @returns undefined if movie with the given id does not exist
 */
export async function deleteMovie(id) {
  // TODO
  const sql = `
  DELETE FROM movies
  WHERE id = $1
  RETURNING *
  `;
  const { rows: [movie] } = await db.query(sql, [id]);
  return movie;
}
