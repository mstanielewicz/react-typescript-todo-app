import { ITodo } from "../../interfaces";

export interface ITodoAppState {
  todos: ITodo[];
}

export type TodoAppActionType =
  | { type: "ADD_TODO"; todo: ITodo }
  | { type: "TOGGLE_DONE"; id: string }
  | { type: "UPDATE_TODO"; todo: ITodo };
