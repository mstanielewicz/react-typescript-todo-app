import React from "react";

export interface ITodoEntryProps {
  dispatch: React.Dispatch;
  done: boolean;
  id: string;
  listId: string;
  title: string;
}
