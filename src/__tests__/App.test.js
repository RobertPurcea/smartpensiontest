import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "../App";

afterEach(cleanup);

test("renders no cards in the initial state", () => {
  const { container } = render(<App />);

  expect(container.querySelector(".card")).toBeNull();
});
