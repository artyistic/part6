const filterReducer = (state = "", action) => {
  console.log("state now: ", state)
  console.log("action", action)
  switch(action.type) {
    case "modify":
      return action.payload
    default:
      return state
  }
}


export const modifyFilter = (filter) => {
  return {
    type: "modify",
    payload: filter
  }
}

export default filterReducer