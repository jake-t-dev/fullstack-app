const useDeleteCreature = () => {
  const deleteCreature = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/creatures/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete creature");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { deleteCreature };
};

export default useDeleteCreature;
