import { toast } from "react-toastify";
import { ChangeEvent, FC, useMemo, useState } from "react";
import {
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { translate } from "@root/i18n";

import { Filter, Todo } from "@modules/Todos/types";
import TodoItem from "@modules/Todos/components/TodoItem";
import { AddTodo, CompleteTodo } from "@modules/Todos/store/todoReducer";

const MAX_CHAR = 10;
const FILTERS: Filter[] = ["all", "completed", "current"];

type Props = {
  addTodo: AddTodo;
  completeTodo: CompleteTodo;
  todos: Todo[];
};

const TodosScreen: FC<Props> = ({
  addTodo = () => undefined,
  completeTodo = () => undefined,
  todos = [],
}) => {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [currentFilter, setCurrentFilter] = useState(FILTERS[0]);

  const handleName = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setName(event.target.value);

  const handleAddTodo = () => {
    if (!name) {
      return toast(translate("todos:errors.minChar"), { type: "error" });
    }
    if (name.length >= MAX_CHAR) {
      return toast(
        translate("todos:errors.maxCharExceeded", { maxChar: MAX_CHAR }),
        {
          type: "error",
        }
      );
    }
    addTodo({ name });
  };

  const handleChangeFilter = (filter: Filter) => {
    setCurrentFilter(filter);
  };

  const handleComplete = (id: string) => {
    completeTodo({ id });
  };

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos]
  );
  const uncompletedTodos = todos.length - completedTodos;

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "completed":
            return todo.completed;
          case "current":
            return !todo.completed;

          default:
            return true;
        }
      }),
    [todos, currentFilter]
  );

  return (
    <Container maxWidth={"sm"} sx={{ marginTop: 3, paddingBottom: 5 }}>
      <Stack gap={3}>
        <Typography fontWeight={"bold"} variant={"h4"}>
          {translate("general:appName")}
        </Typography>
        <Typography color={theme.palette.text.secondary}>
          {`${completedTodos} ${translate(
            "todos:completed"
          )} · ${uncompletedTodos} ${translate("todos:uncompleted")}`}
        </Typography>
        <Grid
          gap={1}
          container
          position={"sticky"}
          top={0}
          zIndex={1000}
          paddingY={1}
          alignItems={"center"}
          sx={{ backgroundColor: theme.palette.background.default }}
        >
          {FILTERS.map((filter) => (
            <Chip
              onClick={() => handleChangeFilter(filter)}
              label={translate(`todos:${filter}`)}
              key={filter}
              variant={currentFilter === filter ? "filled" : "outlined"}
            />
          ))}
        </Grid>
        <Grid
          gap={3}
          container
          alignItems={"center"}
          sx={{
            flexWrap: "nowrap",
            [theme.breakpoints.down("sm")]: {
              flexWrap: "wrap",
            },
          }}
        >
          <TextField
            fullWidth
            placeholder={translate("todos:todoName")}
            value={name}
            onChange={handleName}
          />
          <Button
            onClick={handleAddTodo}
            sx={{
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
            }}
          >
            {translate("todos:add")}
          </Button>
        </Grid>
        {!!filteredTodos.length ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              name={todo.name}
              id={todo.id}
              completed={todo.completed}
              onComplete={handleComplete}
            />
          ))
        ) : (
          <Typography color={theme.palette.text.secondary}>
            {translate("todos:noTodos")}
          </Typography>
        )}
      </Stack>
    </Container>
  );
};

export default TodosScreen;
