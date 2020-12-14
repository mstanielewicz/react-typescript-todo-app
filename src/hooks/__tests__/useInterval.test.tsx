import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import useInterval from "../useInterval";

const Component = () => {
  const [counter, setCounter] = React.useState(0);
  useInterval(() => setCounter((previous) => previous + 1), 100);
  return <div>{counter}</div>;
};

test("useInterval works as expected", async () => {
  const { queryByText } = render(<Component />);
  expect(queryByText("0")).toBeInTheDocument();
  await waitFor(() => expect(queryByText("0")).toBeFalsy());
  expect(queryByText("1")).toBeInTheDocument();
  await waitFor(() => expect(queryByText("1")).toBeFalsy());
  expect(queryByText("2")).toBeInTheDocument();
});
