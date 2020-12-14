import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import TodoApp from "../TodoApp.component";

test("TodoApp renders without error", () => {
  const { container } = render(<TodoApp />);
  expect(container.firstChild).toBeTruthy();
});

test("TodoApp contains one list", () => {
  const { container } = render(<TodoApp />);
  expect(container.querySelectorAll("ul").length).toBe(1);
});
