import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";

function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

export default nextTick;