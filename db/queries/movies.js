import db from "#db/client";

export async function getMovies() {
  const sql = `
  SELECT *
  FROM movies
  `;
  const { rows: movies } = await db.query(sql);
  return movies;
}

export async function createMovie({ name, releaseDate, runningTime }) {
  // TODO
}
