import React from "react";
import { ITodo } from "../../interfaces";

export interface ITodoListProps {
  dispatch: React.Dispatch;
  id: string;
  name: string;
  todos: ITodo[];
}

export interface ITodoListState {
  name: string;
}
