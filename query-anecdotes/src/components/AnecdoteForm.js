import { useMutation, useQueryClient} from "react-query"
import { addAnec } from "./requests"
import { useContext } from "react"
import NotificationContext from "../NotifcationContext"

const AnecdoteForm = () => {

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecMut = useMutation(addAnec, {
    onSuccess: (newAnec) => {
      const anecs = queryClient.getQueryData("anecdotes")
      queryClient.setQueryData("anecdotes", anecs.concat(newAnec))
    },
    onError: (error) => {
      notificationDispatch({ type: "SET", payload: error.response.data.error})
      setTimeout(() => notificationDispatch({ type: "CLEAR"}), 5000)
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecMut.mutate({content: content, votes: 0})
    notificationDispatch({ type: "SET", payload: `anecdote "${content}" is created`})
    setTimeout(() => notificationDispatch({ type: "CLEAR"}), 5000)

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
