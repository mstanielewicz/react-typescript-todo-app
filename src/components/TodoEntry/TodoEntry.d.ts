import React from "react";

export interface ITodoEntryProps {
  bgcolor: string;
  dateText: string | null;
  dispatch: React.Dispatch;
  done: boolean;
  id: string;
  listId: string;
  title: string;
}
