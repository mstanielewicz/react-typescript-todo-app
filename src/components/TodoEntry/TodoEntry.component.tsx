import React from "react";
import {
  Box,
  Checkbox,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp, Delete } from "@material-ui/icons";
import {
  deleteTodo,
  moveTodoDown,
  moveTodoUp,
  toggleDone,
} from "../TodoApp/TodoApp.actions";
import { ITodoEntryProps } from "./TodoEntry";

const TodoEntry: React.FunctionComponent<ITodoEntryProps> = ({
  bgcolor,
  dateText,
  dispatch,
  done,
  id,
  listId,
  title,
}) => (
  <Box bgcolor={bgcolor} border={1} component={ListItem} marginBottom={1}>
    <Grid alignItems="center" container>
      <Grid item>
        <Checkbox
          checked={done}
          onChange={() => dispatch(toggleDone(listId, id))}
        />
      </Grid>
      <Grid item>
        <ListItemText>{title}</ListItemText>
      </Grid>
      <Box marginLeft="auto">
        <Grid alignItems="center" container justify="flex-end">
          <Grid item>
            <Typography>{dateText}</Typography>
          </Grid>
          <Grid item>
            <IconButton
              color="primary"
              onClick={() => dispatch(moveTodoUp(listId, id))}
            >
              <KeyboardArrowUp />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => dispatch(moveTodoDown(listId, id))}
            >
              <KeyboardArrowDown />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => dispatch(deleteTodo(listId, id))}
            >
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  </Box>
);

export default TodoEntry;
