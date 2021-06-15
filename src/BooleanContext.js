import { createContext } from "react";

const BooleanContext = createContext([
  [
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
  ],
  () => {},
]);

export default BooleanContext;
