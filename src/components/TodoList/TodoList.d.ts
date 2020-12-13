import React from "react";

export interface ITodoListProps {
  dispatch: React.Dispatch;
  id: string;
  name: string;
  todos: ITodo[];
}

export interface ITodoListState {
  name: string;
}
