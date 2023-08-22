import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getAnec, changeAnec } from "./components/requests"
const App = () => {


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
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
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
  )
}

export default App
