import { useSelector, useDispatch } from "react-redux";
import { voteReducer } from "../reducers/anecdoteReducer";
import { voteNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    console.log("state ", state);
    if (state.filter !== "") {
      const filter = state.filter.toLowerCase();
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter)
      );
    } else {
      return state.anecdotes;
    }
  });

  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteReducer(id));
    dispatch(voteNotification(anecdotes, id));
    console.log("voted", id);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
