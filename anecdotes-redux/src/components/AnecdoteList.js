import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification, setNotificationWithTimeout } from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === "")
      return state.anecdotes
    else 
      return state.anecdotes.filter(a => a.content.includes(state.filter))
  })
  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotificationWithTimeout(`you voted '${anecdote.content}'`, 5))
  }

  // reassigning is needed to avoid directly mutating the state in redux
  const filteredAnecdotes = [...anecdotes]
  return (
    <>
      {
        filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default AnecdoteList