import { createSlice } from "@reduxjs/toolkit"


// const filterReducer = (state = "", action) => {
//   console.log("state now: ", state)
//   console.log("action", action)
//   switch(action.type) {
//     case "modify":
//       return action.payload
//     default:
//       return state
//   }
// }

const filterReducer = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    modifyFilter(state, action) {
      return action.payload
    }
  }
})
// export const modifyFilter = (filter) => {
//   return {
//     type: "modify",
//     payload: filter
//   }
// }

export const { modifyFilter } = filterReducer.actions
export default filterReducer.reducer