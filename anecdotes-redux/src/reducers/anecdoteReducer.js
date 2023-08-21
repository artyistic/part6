import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAllAnec(state, action) {
      return action.payload
    },
    voteAnec(state, action) {
      const id = action.payload
      const toChange = state.find(a => a.id === id)
      const changedAnec = {...toChange, votes: toChange.votes + 1}
      return state.map(anec => anec.id === id ? changedAnec : anec)
    },
    addAnec(state, action) {
      return state.concat({content: action.payload, id: getId(), votes: 0})
    }
  }
})

export const { voteAnec, addAnec, setAllAnec } = anecdoteSlice.actions
export default anecdoteSlice.reducer
