import React from "react";
import { render, cleanup } from "@testing-library/react";
import AiContainer from "../components/AiContainer";
import { maxAiProcessingTime } from "../util/constants";

afterEach(cleanup);

test(`runs given function after a delay no longer than ${maxAiProcessingTime}`, done => {
  jest.setTimeout(30000);
  const fn = jest.fn();

  render(<AiContainer action={fn} />);

  setTimeout(() => {
    expect(fn).toBeCalled();
    done();
  }, maxAiProcessingTime);
});
