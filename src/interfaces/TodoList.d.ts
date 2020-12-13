import { ITodo } from "./Todo";

export interface ITodoList {
  id: string;
  name: string;
  todos: ITodo[];
}
