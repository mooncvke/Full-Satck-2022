const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log("action", action);
  console.log("state", state);
  switch (action.type) {
    case "GOOD":
      const newStateGood = { ...state };
      newStateGood.good++;
      return newStateGood;
    case "OK":
      const newStateOk = { ...state };
      newStateOk.ok++;
      return newStateOk;
    case "BAD":
      const newStateBad = { ...state };
      newStateBad.bad++;
      return newStateBad;
    case "ZERO":
      return initialState;
    default:
      return state;
  }
};

export default counterReducer;
