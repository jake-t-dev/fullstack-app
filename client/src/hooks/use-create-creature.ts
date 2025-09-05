import type { Creature } from "../types/types";

const useCreateCreature = () => {
  const createCreature = (creature: Creature) => {
    return fetch("http://localhost:3000/creatures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creature),
    });
  };
  return { createCreature };
};

export default useCreateCreature;
