import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import TodoEntry from "../TodoEntry.component";

test("TodoEntry renders without error", () => {
  const { container } = render(
    <TodoEntry
      bgcolor=""
      dateText=""
      dispatch={jest.fn()}
      done={true}
      id=""
      listId=""
      title=""
    />
  );
  expect(container.firstChild).toBeTruthy();
});

test("TodoEntry works as expected", () => {
  const dispatch = jest.fn();
  const { container, getByText } = render(
    <TodoEntry
      bgcolor=""
      dateText="tommorow"
      dispatch={dispatch}
      done={true}
      id="todo_1"
      listId="list_1"
      title="Todo 1"
    />
  );
  expect(getByText("Todo 1")).toBeInTheDocument();
  expect(getByText("tommorow")).toBeInTheDocument();
  expect(container.querySelector("input")?.parentNode?.parentNode).toHaveClass(
    "Mui-checked"
  );

  container.querySelectorAll("button").forEach((btn) => fireEvent.click(btn));
  expect(dispatch.mock.calls).toEqual([
    [{ id: "todo_1", listId: "list_1", type: "MOVE_TODO_UP" }],
    [{ id: "todo_1", listId: "list_1", type: "MOVE_TODO_DOWN" }],
    [{ id: "todo_1", listId: "list_1", type: "DELETE_TODO" }],
  ]);
});
