import { useSelector, useDispatch } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers/anecdoteReducer";
import { voteReducer, createAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id, votes) => {
    dispatch(voteReducer(id));
    console.log("voted", id);
  };

  const newAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    console.log("content", content);
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.votes)}>
              vote
            </button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
