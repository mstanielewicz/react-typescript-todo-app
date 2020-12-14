import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import TodoForm from "../TodoForm.component";

jest.mock("shortid", () => ({
  generate: () => "id_1",
}));

test("TodoForm renders without error", () => {
  const { container } = render(<TodoForm dispatch={jest.fn()} listId="id_1" />);
  expect(container.firstChild).toBeTruthy();
});

test("TodoForm works as expected", async () => {
  const dispatch = jest.fn();
  const { container, getByText, queryByText } = render(
    <TodoForm dispatch={dispatch} listId="list_1" />
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

  fireEvent.click(inputs[1]);

  await waitFor(() =>
    expect(container.querySelectorAll("input").length).toBe(3)
  );

  expect(container.querySelectorAll("input")[2]).toHaveAttribute(
    "type",
    "date"
  );

  fireEvent.input(container.querySelectorAll("input")[2], {
    target: {
      value: "2020-01-01",
    },
  });

  fireEvent.click(container.querySelector("button")!);

  await waitFor(() => expect(dispatch.mock.calls.length).toBe(1));

  expect(dispatch.mock.calls).toEqual([
    [
      {
        listId: "list_1",
        todo: {
          date: "2020-01-01",
          done: false,
          id: "id_1",
          title: "Lorem ipsum dolor sit amet",
        },
        type: "ADD_TODO",
      },
    ],
  ]);
});
