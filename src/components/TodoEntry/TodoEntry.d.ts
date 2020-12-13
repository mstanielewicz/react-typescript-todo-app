import React from "react";

export interface ITodoEntryProps {
  date: Date;
  dispatch: React.Dispatch;
  done: boolean;
  id: string;
  listId: string;
  title: string;
}
