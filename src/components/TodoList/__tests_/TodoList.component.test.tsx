import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import TodoList from "../TodoList.component";

test("TodoList renders without error", () => {
  const { container } = render(
    <TodoList dispatch={jest.fn()} id="id_1" name="List 1" todos={[]} />
  );
  expect(container.firstChild).toBeTruthy();
});

test("TodoList empty list renders correctly", async () => {
  const { getByText } = render(
    <TodoList dispatch={jest.fn()} id="id_1" name="List 1" todos={[]} />
  );
  expect(getByText("Add todo to empty list...")).toBeInTheDocument();
});

test("TodoList list renders correctly", async () => {
  const todos = [
    {
      date: "2021-01-01",
      done: false,
      id: "id_2",
      title: "Todo 1",
    },
    {
      date: "1999-01-01",
      done: false,
      id: "id_1",
      title: "Todo 2",
    },
    {
      date: "2022-01-01",
      done: false,
      id: "id_3",
      title: "Todo 3",
    },
  ];
  const { container } = render(
    <TodoList dispatch={jest.fn()} id="id_1" name="List 1" todos={todos} />
  );

  expect(
    Array.from(container.querySelectorAll(".MuiListItemText-root")).map(
      (node) => node!.firstChild!.textContent
    )
  ).toEqual(["Todo 2", "Todo 1", "Todo 3"]);
});

test("TodoList title input works correctly", async () => {
  const { container, getByText, queryByText } = render(
    <TodoList dispatch={jest.fn()} id="id_1" name="List 1" todos={[]} />
  );

  const inputs = container.querySelectorAll("input");

  fireEvent.input(inputs[0], {
    target: {
      value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
  });

  await waitFor(() =>
    expect(container.querySelector(".Mui-error")).toBeInTheDocument()
  );

  expect(getByText("50 characters allowed!")).toBeInTheDocument();

  fireEvent.input(inputs[0], {
    target: {
      value: "Lorem ipsum dolor sit amet",
    },
  });

  await waitFor(() =>
    expect(container.querySelector(".Mui-error")).toBeFalsy()
  );

  expect(queryByText("50 characters allowed!")).toBeNull();
});
