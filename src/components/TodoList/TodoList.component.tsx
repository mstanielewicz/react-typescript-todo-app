import React from "react";
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
import { DateTime } from "luxon";
import { Controller, FormProvider, useForm } from "react-hook-form";
import useInterval from "../../hooks/useInterval";
import { updateListName } from "../TodoApp/TodoApp.actions";
import TodoEntry from "../TodoEntry";
import TodoForm from "../TodoForm";
import { ITodoListProps, ITodoListState } from "./TodoList";

const TodoList: React.FunctionComponent<ITodoListProps> = ({
  dispatch,
  id,
  name,
  todos,
}) => {
  const [edit, setEdit] = React.useState(name ? false : true);
  const [, setCurrentTime] = React.useState<string>("");

  useInterval(() => setCurrentTime(DateTime.local().toString()), 1000);

  const form = useForm<ITodoListState>({
    defaultValues: { name },
    mode: "onChange",
  });

  const submit = (data: ITodoListState) => {
    dispatch(updateListName(id, data.name));
    setEdit(false);
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    form.reset({ name });
    setEdit(true);
  };

  const expiredTodos = todos.filter((todo) => {
    if (!todo.date) return false;

    return DateTime.fromJSDate(new Date(todo.date)).diffNow("hour").hours < 0;
  });

  const futureTodos = todos.filter((todo) => {
    if (!todo.date) return true;

    return DateTime.fromJSDate(new Date(todo.date)).diffNow("hour").hours >= 0;
  });

  return (
    <Grid item xs={12}>
      <Paper elevation={3}>
        <Box padding={2}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              {edit ? (
                <FormProvider {...form}>
                  <form onSubmit={form.handleSubmit(submit)}>
                    <Controller
                      as={TextField}
                      error={!!form.errors.name?.type}
                      helperText={form.errors.name?.message}
                      name="name"
                      placeholder="List name..."
                      rules={{
                        maxLength: {
                          value: 50,
                          message: "50 characters allowed!",
                        },
                      }}
                      size="medium"
                    />
                    <IconButton color="primary" type="submit">
                      <Done />
                    </IconButton>
                  </form>
                </FormProvider>
              ) : (
                <Typography onClick={handleClick} variant="h5">
                  {name}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <List>
                {todos.length === 0 ? (
                  <ListItem>Add todo to empty list...</ListItem>
                ) : null}
                {expiredTodos.map((todo) => (
                  <TodoEntry
                    bgcolor="error.light"
                    dateText={DateTime.fromJSDate(
                      new Date(todo.date)
                    ).toRelativeCalendar({
                      locale: "en",
                    })}
                    dispatch={dispatch}
                    key={todo.id}
                    listId={id}
                    {...todo}
                  />
                ))}
                {futureTodos.map((todo) => (
                  <TodoEntry
                    bgcolor={
                      DateTime.fromJSDate(new Date(todo.date)).diffNow("hours")
                        .hours < 24
                        ? "info.light"
                        : ""
                    }
                    dateText={DateTime.fromJSDate(
                      new Date(todo.date)
                    ).toRelativeCalendar({
                      locale: "en",
                    })}
                    dispatch={dispatch}
                    key={todo.id}
                    listId={id}
                    {...todo}
                  />
                ))}
              </List>
            </Grid>
            <Grid item>
              <TodoForm dispatch={dispatch} listId={id} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
};

export default TodoList;
