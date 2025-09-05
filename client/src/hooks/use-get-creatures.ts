const useGetCreatures = () => {
  const getCreatures = async () => {
    const response = await fetch("http://localhost:3000/creatures");
    const data = await response.json();
    return data;
  };

  return { getCreatures };
};

export default useGetCreatures;
