import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getAnec, changeAnec } from "./components/requests"
import { useReducer } from 'react'
import NotificationContext from './NotifcationContext'


const notificationReducer = (state, action) => {
  switch(action.type) {
    case "SET":
      return action.payload
    case "CLEAR":
      return ""
    default:
      return state
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "")


  const queryClient = useQueryClient()
  const changeAnecMut = useMutation(changeAnec, {
    onSuccess: (changedAnec) => {
      const anecs = queryClient.getQueryData("anecdotes")
      queryClient.setQueryData("anecdotes", anecs.map(anec => anec.id === changedAnec.id ? changedAnec : anec))
    }
  })
  const handleVote = (anecdote) => {
    console.log('vote', anecdote)
    changeAnecMut.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({ type: "SET", payload: `anecdote "${anecdote.content}" is voted`})
    setTimeout(() => notificationDispatch({ type: "CLEAR"}), 5000)

  }

  const result = useQuery(
    "anecdotes",
    getAnec,
    {
      retry: false,
      refetchOnWindowFocus: false
    }
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.isError ) {
    return <div>anecdote service not available due to error in server</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
    <div>
      <h3>Anecdote app</h3>
    
      <Notification message={notification}/>
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </NotificationContext.Provider>
  )
}

export default App
