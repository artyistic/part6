import { useMutation, useQueryClient} from "react-query"
import { addAnec } from "./requests"


const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const newAnecMut = useMutation(addAnec, {
    onSuccess: (newAnec) => {
      console.log("hi is this executing")
      const anecs = queryClient.getQueryData("anecdotes")
      queryClient.setQueryData("anecdotes", anecs.concat(newAnec))
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecMut.mutate({content: content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
