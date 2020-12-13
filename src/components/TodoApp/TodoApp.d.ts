import { ITodo, ITodoList } from "../../interfaces";

export interface ITodoAppState {
  todoLists: ITodoList[];
}

export type TodoAppActionType =
  | { type: "UPDATE_LIST_NAME"; listId: string; name: string }
  | { type: "ADD_TODO"; listId: string; todo: ITodo }
  | { type: "TOGGLE_DONE"; listId: string; id: string }
  | { type: "UPDATE_TODO"; listId: string; todo: ITodo };
