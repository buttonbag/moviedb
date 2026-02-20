import { faker } from "@faker-js/faker";
import db from "#db/client";
import { createMovie } from "./queries/movies.js";

await db.connect();
await seedMovies();
await db.end();
console.log("🌱 Database seeded.");

async function seedMovies() {
  // TODO
  for (let movieCount = 0; movieCount < 10; movieCount++) {

    await createMovie({
      name: faker.book.title(),
      releaseDate: faker.date.birthdate(),
      runningTime: faker.number.int({min: 90, max: 260})
    });
    
  }
  console.log(`🍿 SUCCESSFULLY CREATED MOVIES`);
}
