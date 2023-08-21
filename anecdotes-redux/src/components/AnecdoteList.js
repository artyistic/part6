import { useSelector, useDispatch } from "react-redux";
import { voteAnec } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === "")
      return state.anecdotes
    else 
      return state.anecdotes.filter(a => a.content.includes(state.filter))
  })
  const dispatch = useDispatch()
  const vote = (id, anecdote) => {
    console.log("vote", id)
    console.log("testing voteAnec", voteAnec)
    dispatch(voteAnec(id))
    dispatch(setNotification(`you voted "${anecdote}"`))
    setTimeout(() => dispatch(removeNotification()), 5000)
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
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default AnecdoteList