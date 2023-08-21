import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = (event) => {
    event.preventDefault()
    const newAnec = event.target.anec.value
    console.log("adding", newAnec)
    // anecService
    //   .newAnec(newAnec)
    //   .then(newAnec => dispatch(addAnec(newAnec.content)))
    dispatch(createAnecdote(newAnec))
    
  }
  return(
    <>
      <h2>create new</h2>
      <form name="newAnec" onSubmit={add}>
        <div>
          <input name="anec"/>
          <button type="submit">create</button>
        </div>   
      </form>
    </>
  )
}

export default AnecdoteForm