import { useSelector, useDispatch } from "react-redux";
import { voteAnec } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === "")
      return state.anecdotes
    else 
      return state.anecdotes.filter(a => a.content.includes(state.filter))
  })
  const dispatch = useDispatch()
  const vote = (id) => {
    console.log("vote", id) 
    dispatch(voteAnec(id))
  }

  //const filteredAnecdotes = anecdotes.filter === "" ? anecdotes : anecdotes.filter(a => a.content.includes(anecdotes.filter))
  const filteredAnecdotes = anecdotes
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
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default AnecdoteList