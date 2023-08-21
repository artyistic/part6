import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newAnec = async (anecdote) => {
  const newAnec = {
    "content": anecdote,
    votes: 0
  }
  const response = await axios.post(baseUrl, newAnec)
  return response.data
}

const anecService = { getAll, newAnec }
export default anecService