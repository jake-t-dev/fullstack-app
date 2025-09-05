import { Router } from "express";
import client from "../database.js";
import { Creature } from "../types.js";

const creatureRouter = Router();

creatureRouter.get("/", async (req, res) => {
  const creatures = await client.query("SELECT * FROM creatures");
  res.json(creatures.rows as Creature[]);
});

creatureRouter.post("/", async (req, res) => {
  const { name, image, initiative } = req.body;
  const createdAt = new Date();
  const creature = await client.query(
    "INSERT INTO creatures (name, image, initiative, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, image, initiative, createdAt, createdAt]
  );
  res.json(creature.rows[0] as Creature);
});

creatureRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, image, initiative } = req.body;
  const updatedAt = new Date();
  const creature = await client.query(
    "UPDATE creatures SET name = $1, image = $2, initiative = $3, updated_at = $4 WHERE id = $5 RETURNING *",
    [name, image, initiative, updatedAt, id]
  );
  res.json(creature.rows[0] as Creature);
});

creatureRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await client.query("DELETE FROM creatures WHERE id = $1", [id]);
  res.json({ message: "Creature deleted" });
});

export default creatureRouter;
