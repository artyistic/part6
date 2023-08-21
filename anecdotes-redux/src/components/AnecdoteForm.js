import { useDispatch } from "react-redux"
import { addAnec } from "../reducers/anecdoteReducer"
import anecService from "../services/anecService"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = (event) => {
    event.preventDefault()
    const newAnec = event.target.anec.value
    console.log("adding", newAnec)
    anecService
      .newAnec(newAnec)
      .then(newAnec => dispatch(addAnec(newAnec.content)))
    
  }
  return(
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anec"/>
          <button type="submit">create</button>
        </div>   
      </form>
    </>
  )
}

export default AnecdoteForm