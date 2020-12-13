import React from "react";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { addTodo } from "../TodoApp/TodoApp.actions";
import { ITodoFormProps, ITodoFormState } from "./TodoForm";

const TodoForm: React.FunctionComponent<ITodoFormProps> = ({
  dispatch,
  listId,
}) => {
  const [dateEnabled, setDateEnabled] = React.useState(false);

  const form = useForm<ITodoFormState>({
    defaultValues: { date: "", title: "" },
    mode: "onChange",
  });

  const submit = (data: ITodoFormState) => {
    dispatch(addTodo(listId, data));
    form.reset();
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <Grid container spacing={2}>
            <Grid item>
              <Controller
                as={TextField}
                name="title"
                placeholder="Todo title..."
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={() => setDateEnabled((previous) => !previous)}
                  />
                }
                label="Date"
                labelPlacement="start"
              />
            </Grid>
            {dateEnabled ? (
              <Grid item>
                <Controller as={TextField} name="date" type="date" />
              </Grid>
            ) : null}
            <Grid item>
              <IconButton color="primary" type="submit">
                <Done />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </div>
  );
};

export default TodoForm;
