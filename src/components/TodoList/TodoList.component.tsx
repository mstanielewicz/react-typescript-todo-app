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
import { Controller, FormProvider, useForm } from "react-hook-form";
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

  const form = useForm<ITodoListState>({
    defaultValues: { name },
    mode: "onSubmit",
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

  return (
    <Grid item sm={6} xs={12}>
      <Paper elevation={3}>
        <Box padding={2}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              {edit ? (
                <FormProvider {...form}>
                  <form onSubmit={form.handleSubmit(submit)}>
                    <Controller
                      as={TextField}
                      name="name"
                      placeholder="List name..."
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
                {todos.map((todo) => (
                  <TodoEntry
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
