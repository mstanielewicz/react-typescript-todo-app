import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { updateListName } from "../TodoApp/TodoApp.actions";
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
    <div>
      <div>
        {edit ? (
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
              <Controller as="input" name="name" />
              <button type="submit">Save</button>
            </form>
          </FormProvider>
        ) : (
          <div onClick={handleClick}>{name}</div>
        )}
      </div>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>{JSON.stringify(todo)}</div>
        ))}
      </div>
      <div>
        <TodoForm dispatch={dispatch} listId={id} />
      </div>
    </div>
  );
};

export default TodoList;
