import React, { useState, useLayoutEffect, useEffect } from "react";

const createGlobalValue = initialState => {
  const state = {
    store: initialState,
    setStore: () => {
      state.setter.forEach(setter => setter(state.store));
    },
    setter: []
  };

  return () => {
    const [globalValue, setGlobalValue] = useState(state.store);

    useEffect(() => {
      state.setter = state.setter.filter(item => item !== setGlobalValue);
    });

    // 这个本质上和useEffect没有什么区别，但是useEffect 会在dom挂载之后，才会执行，这样如果这useEffect里操作dom，会出现闪屏
    // 而useLayoutEffect则不会出现闪屏的现象
    useLayoutEffect(() => {
      if (!state.setter.includes(setGlobalValue)) {
        state.setter.push(setGlobalValue);
      }
    });
    return [state.store, state.setStore];
  };
};

export default createGlobalValue;
