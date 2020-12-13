import React from "react";
import { Box, Container, Grid } from "@material-ui/core";
import TodoList from "../TodoList";
import reducer, { initialState } from "./TodoApp.reducer";

const TodoApp = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Container>
      <Box marginTop={1}>
        <Grid container>
          {state.todoLists.map((list) => (
            <TodoList dispatch={dispatch} key={list.id} {...list} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default TodoApp;
