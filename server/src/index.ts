import express from "express";
import cors from "cors";
import client from "./database.js";
import creatureRouter from "./routes/creatures.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect to database and create users table if not exists
client
  .connect()
  .then(async () => {
    await client.query(`
      CREATE TABLE IF NOT EXISTS creatures (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT,
        initiative INTEGER
      );
    `);
    console.log("Connected to database and ensured users table exists");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

// error handling
client.on("error", (err) => {
  console.error("Database error:", err);
});

// routes
app.use("/creatures", creatureRouter);

// start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
