import React from "react";

export interface ITodoFormProps {
  dispatch: React.Dispatch;
}

export interface ITodoFormState {
  date: Date;
  title: string;
}
