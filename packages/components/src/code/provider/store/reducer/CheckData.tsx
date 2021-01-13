const checkData = (state = null, action: any) => {
  console.log('state redux: ', state, 'action redux: ', action)
  switch (action.type) {
    case 'CHECK_DATA':
      return action.payload
      break
    default:
      return state
      break
  }
}
export default checkData
