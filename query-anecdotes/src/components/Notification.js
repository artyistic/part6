const Notification = ({message}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  console.log(message)
  
  if (message === "") return null
  else {
    return (
      <div style={style}>
        {message}
      </div>
    )
  }
}

export default Notification
