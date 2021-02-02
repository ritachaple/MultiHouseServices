const initialState = {
  isHeaderSelect: false,
}

const checkData = (state = { initialState }, action: any) => {
  console.log('state redux: ', state, 'action redux: ', action)
  switch (action.type) {
    case 'CHECK_DATA':
      return action.payload
      break
    case 'IS_HEADER_SELECT':
      return {
        ...state,
        isHeaderSelect: action.payload,
      }
    case 'CLEAR_HEADER':
      return {
        // ...state,
        initialState,
      }
      break
    default:
      return state
      break
  }
}
export default checkData
