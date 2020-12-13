import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { addTodo } from "../TodoApp/TodoApp.actions";
import { ITodoFormProps, ITodoFormState } from "./TodoForm";

const TodoForm: React.FunctionComponent<ITodoFormProps> = ({ dispatch }) => {
  const form = useForm<ITodoFormState>({
    defaultValues: { date: "", title: "" },
    mode: "onChange",
  });

  const submit = (data: ITodoFormState) => dispatch(addTodo(data));

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <Controller as="input" name="title" />
          <Controller as="input" name="date" type="date" />
          <button type="submit">Add</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default TodoForm;
