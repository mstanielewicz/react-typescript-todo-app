import shortid from "shortid";
import { ITodo } from "../../interfaces";
import { TodoAppActionType } from "./TodoApp";

export const updateListName = (
  listId: string,
  name: string
): TodoAppActionType => ({
  type: "UPDATE_LIST_NAME",
  listId,
  name,
});

export const addTodo = (
  listId: string,
  todo: {
    date: Date;
    title: string;
  }
): TodoAppActionType => ({
  type: "ADD_TODO",
  listId,
  todo: {
    ...todo,
    done: false,
    id: shortid.generate(),
  },
});

export const toggleDone = (listId: string, id: string): TodoAppActionType => ({
  type: "TOGGLE_DONE",
  id,
  listId,
});

export const updateTodo = (listId: string, todo: ITodo): TodoAppActionType => ({
  type: "UPDATE_TODO",
  listId,
  todo,
});
