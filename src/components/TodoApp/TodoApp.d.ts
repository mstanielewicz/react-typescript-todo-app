import { ITodo, ITodoList } from "../../interfaces";

export interface ITodoAppState {
  todoLists: ITodoList[];
}

export type TodoAppActionType =
  | { type: "UPDATE_LIST_NAME"; listId: string; name: string }
  | { type: "ADD_TODO"; listId: string; todo: ITodo }
  | { type: "TOGGLE_DONE"; listId: string; id: string }
  | { type: "DELETE_TODO"; listId: string; id: string }
  | { type: "MOVE_TODO_UP"; listId: string; id: string }
  | { type: "MOVE_TODO_DOWN"; listId: string; id: string };
