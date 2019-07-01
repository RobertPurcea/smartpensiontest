import React from "react";

import { getRandomInt } from "../util/utility";
import { maxAiProcessingTime, minAiProcessingTime } from "../util/constants";

class AiContainer extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.action();
    }, getRandomInt(minAiProcessingTime, maxAiProcessingTime));
  }

  render() {
    return this.props.children || null;
  }
}

export default AiContainer;
