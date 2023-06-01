import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      console.log("action", asObject(action.payload));
      console.log("state", JSON.parse(JSON.stringify(state)));
      console.log(
        "test ",
        JSON.parse(JSON.stringify([...state, asObject(action.payload)]))
      );
      return [...state, asObject(action.payload)];
    },
    voteReducer(state, action) {
      console.log("action", action);
      const id = action.payload;
      console.log("id", id);
      console.log("state", JSON.parse(JSON.stringify(state)));
      return state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
  },
});
export const { createAnecdote, voteReducer } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
