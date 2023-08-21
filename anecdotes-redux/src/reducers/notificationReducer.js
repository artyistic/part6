import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ""
    }
  }
})

export const setNotificationWithTimeout = (content, sec) => {
  return dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => dispatch(removeNotification()), sec*1000)
  }
}

export const { setNotification, removeNotification } = notificationReducer.actions
export default notificationReducer.reducer