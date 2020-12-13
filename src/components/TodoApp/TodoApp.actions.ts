import shortid from "shortid";
import { ITodo } from "../../interfaces";
import { TodoAppActionType } from "./TodoApp";

export const addTodo = (todo: {
  date: Date;
  title: string;
}): TodoAppActionType => ({
  type: "ADD_TODO",
  todo: {
    ...todo,
    done: false,
    id: shortid.generate(),
  },
});

export const toggleDone = (id: string): TodoAppActionType => ({
  type: "TOGGLE_DONE",
  id,
});

export const updateTodo = (todo: ITodo): TodoAppActionType => ({
  type: "UPDATE_TODO",
  todo,
});
