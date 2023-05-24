import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";
import initialState from "./anecdoteReducer";

const filterReducer = (state = "", action) => {
  console.log("action", action);
  console.log("state now: ", state);

  switch (action.type) {
    case "SET_FILTER":
      console.log("state.anecdotes", state.anecdotes);
      console.log("state.filter", state.filter);
      return action.filter;

    default:
      return state;
  }
};

export const createFilter = (filter) => {
  return {
    type: "SET_FILTER",
    filter,
  };
};

export default filterReducer;
