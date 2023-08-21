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

const modifyAnec = async (id, modifiedAnec) => {
  const response = await axios.put(`${baseUrl}/${id}`, modifiedAnec)
  return response.data
}

const anecService = { getAll, newAnec, modifyAnec }
export default anecService