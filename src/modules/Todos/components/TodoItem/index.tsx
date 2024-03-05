import { ButtonBase, Grid, Paper, Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  id: string;
  name: string;
  completed: boolean;
  onComplete: (id: string) => void;
};

const TodoItem: FC<Props> = ({
  completed = false,
  id = "",
  name = "",
  onComplete = () => undefined,
}) => {
  const handleComplete = () => onComplete(id);

  return (
    <Paper>
      <Grid container alignItems={"center"} padding={2}>
        <ButtonBase onClick={handleComplete}>
          <Typography
            variant={"h6"}
            sx={{
              textDecoration: completed ? "line-through" : "inherit",
            }}
          >
            {name}
          </Typography>
        </ButtonBase>
      </Grid>
    </Paper>
  );
};

export default TodoItem;
