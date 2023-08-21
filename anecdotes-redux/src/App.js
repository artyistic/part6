import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/FIlter"
import Notification from "./components/Notification"
import { intializeAnecdotes } from "./reducers/anecdoteReducer"
import { useDispatch } from 'react-redux'
import { useEffect } from "react"
const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(intializeAnecdotes())
  }, [dispatch])
  return (
    <div>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App