import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState, useCallback, useMemo } from "react";
import CreatureForm from "../components/creature-form";
import useCreateCreature from "../hooks/use-create-creature";
import useGetCreatures from "../hooks/use-get-creatures";
import type { Creature } from "../types/types";
import CreatureContainer from "../components/creature-container";
import useUpdateCreature from "../hooks/use-update-creature";
import useDeleteCreature from "../hooks/use-delete-creature";

const Home = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(
    null
  );
  const { createCreature } = useCreateCreature();
  const { updateCreature } = useUpdateCreature();
  const { deleteCreature } = useDeleteCreature();
  const { getCreatures } = useGetCreatures();
  const [creatures, setCreatures] = useState<Creature[]>([]);

  const getCreatureData = useCallback(async () => {
    const data = await getCreatures();
    setCreatures(data);
  }, [getCreatures]);

  useEffect(() => {
    getCreatureData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedCreatures = useMemo(
    () =>
      [...creatures].sort((a, b) => (b.initiative ?? 0) - (a.initiative ?? 0)),
    [creatures]
  );

  return (
    <Box sx={{ padding: 4 }}>
      <CreatureForm
        isOpen={isCreateModalOpen}
        onSubmit={async (data) => {
          await createCreature(data);
          setIsCreateModalOpen(false);
          await getCreatureData();
        }}
      />

      <CreatureForm
        isOpen={isEditModalOpen}
        onSubmit={async (data) => {
          await updateCreature(data);
          setIsEditModalOpen(false);
          setSelectedCreature(null);
          await getCreatureData();
        }}
        initialData={selectedCreature ?? undefined}
      />

      <Typography variant="h4" gutterBottom>
        Initiative Tracker
      </Typography>

      <Stack spacing={2} sx={{ gap: 2 }}>
        {sortedCreatures.map((creature) => (
          <CreatureContainer
            key={creature.id}
            creature={creature}
            onEdit={async (updatedCreature) => {
              setSelectedCreature(updatedCreature);
              setIsEditModalOpen(true);
            }}
            onDelete={async (id) => {
              await deleteCreature(id);
              await getCreatureData();
            }}
          />
        ))}
      </Stack>

      <Box mt={2}>
        <Button variant="contained" onClick={() => setIsCreateModalOpen(true)}>
          Add Creature
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
