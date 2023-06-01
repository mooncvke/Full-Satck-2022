import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    createNewNotification: (state, action) => {
      console.log("action", action);
      return "you created " + action.payload;
    },
    voteNotification: (state, action, id) => {
      console.log("state", JSON.parse(JSON.stringify(state)));
      console.log("id", id);
      console.log("action", action);
      var a = "";
      action.payload.map((anecdote) => {
        console.log("anecdote", anecdote);
        if (anecdote.id === action.payload) {
          a = anecdote;
        }
      });
      return "you voted " + a.content;
    },
  },
});

export const { createNewNotification, voteNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
