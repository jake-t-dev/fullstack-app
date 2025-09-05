import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import type { Creature } from "../types/types";

export type creatureContainerProps = {
  creature: Creature;
  onEdit: (creature: Creature) => void;
  onDelete: (id: number) => void;
};

const CreatureContainer = ({
  creature,
  onEdit,
  onDelete,
}: creatureContainerProps) => {
  return (
    <Card key={creature.id} variant="outlined" sx={{ maxWidth: 300, margin: "auto", borderRadius: 8 }}>
      {creature.image && (
        <CardMedia
          component="img"
          image={creature.image}
          alt={creature.name}
          sx={{ maxWidth: 200, height: 200, margin: "auto", borderRadius: 8, marginY: 2 }}
        />
      )}
      <CardContent>
        <Typography variant="h6">{creature.name}</Typography>
        <Typography variant="body2">
          Initiative: {creature.initiative ?? "—"}
        </Typography>
        <Button onClick={() => onEdit(creature)}>Edit</Button>
        <Button
          onClick={() => {
            if (creature.id !== undefined && creature.id !== null)
              onDelete(creature.id);
          }}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreatureContainer;
