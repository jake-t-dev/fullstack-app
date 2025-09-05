import type { Creature } from "../types/types";

const useUpdateCreature = () => {
  const updateCreature = async (creature: Creature) => {
    const id = creature.id;
    const response = await fetch(`http://localhost:3000/creatures/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creature),
    });
    const data = await response.json();
    return data;
  };
  return { updateCreature };
};

export default useUpdateCreature;
