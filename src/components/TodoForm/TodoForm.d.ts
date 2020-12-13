import React from "react";

export interface ITodoFormProps {
  dispatch: React.Dispatch;
  listId: string;
}

export interface ITodoFormState {
  date: string;
  title: string;
}
