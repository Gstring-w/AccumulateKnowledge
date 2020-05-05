import React, { useState, useEffect, useMemo } from "react";

const createBreakPoint = (
  breakPoints: { [name: string]: number } = {
    laptopL: 1440,
    laptop: 1024,
    tablet: 768
  }
) => {
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    function resetSreen(): void {
      setScreen(window.innerWidth);
    }
    window.addEventListener("resize", resetSreen);
    return window.removeEventListener("resize", resetSreen);
  });

  const sortBreakPoints = useMemo(() =>
    Object.entries(breakPoints).sort((a, b) => a[1] - b[1])
  );

  return sortBreakPoints.reduce((acc, [name, width]) => {
    if (width <= screen) {
      return name;
    } else {
      return acc;
    }
  }, sortBreakPoints[0][0]);
};

export default createBreakPoint;
