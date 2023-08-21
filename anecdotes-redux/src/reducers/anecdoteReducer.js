import { createSlice } from "@reduxjs/toolkit"
import anecService from "../services/anecService"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAllAnec(state, action) {
      return action.payload
    },
    addAnec(state, action) {
      return state.concat(action.payload)
    },
    changeAnecdote(state, action) {
      const toBeChanged = action.payload
      return state.map(anec => anec.id === toBeChanged.id ? toBeChanged : anec)
    }
  }
})

export const intializeAnecdotes = () => {
  return async dispatch => {
    const initAnec = await anecService.getAll()
    dispatch(setAllAnec(initAnec))
  }
}

export const createAnecdote = (anec) => {
  return async dispatch => {
    const addedAnec = await anecService.newAnec(anec)
    dispatch(addAnec(addedAnec))
  }
}

export const voteAnecdote = (originalAnec) => {
  return async dispatch => {
    const votedAnec = await anecService.modifyAnec(originalAnec.id, {...originalAnec, votes: originalAnec.votes + 1})
    dispatch(changeAnecdote(votedAnec))
  }
}





export const { addAnec, setAllAnec, changeAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
