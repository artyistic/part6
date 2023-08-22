import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes"

export const getAnec = async () => {
  const response = await axios.get(`${baseURL}`)
  return response.data
}

export const addAnec = async (newAnec) => {
  const response = await axios.post(`${baseURL}`, newAnec)
  return response.data
}

export const changeAnec = async (changedAnec) => {
  const response = await axios.put(`${baseURL}/${changedAnec.id}`, changedAnec)
  return response.data
}

