import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import type { Creature } from "../types/types";
import { useEffect, useState } from "react";

export type CreatureFormProps = {
  onSubmit: (data: Creature) => void;
  initialData?: Creature;
  isOpen: boolean;
};

const CreatureForm = ({ onSubmit, initialData, isOpen }: CreatureFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [initiative, setInitiative] = useState(initialData?.initiative || 0);

  useEffect(() => {
    setName(initialData?.name || "");
    setImage(initialData?.image || "");
    setInitiative(initialData?.initiative || 0);
  }, [initialData, isOpen]);

  return (
    <Modal open={isOpen}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 8,
        }}
      >
        <Stack sx={{ padding: 4, gap: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <TextField
            label="Initiative"
            type="number"
            value={initiative}
            onChange={(e) => setInitiative(Number(e.target.value))}
          />
          <Button
            variant="contained"
            onClick={() => {
              onSubmit({
                name,
                image,
                initiative,
                id: initialData?.id,
              });
            }}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreatureForm;
