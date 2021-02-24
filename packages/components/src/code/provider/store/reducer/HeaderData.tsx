const initialState = {
  isHeaderSelect: false,
  oneTickitSelect: false,
  tickitType: '',
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
    case 'ONE_TICKIT_SELECT':
      return {
        ...state,
        oneTickitSelect: action.payload,
      }
    case 'CLEAR_HEADER':
      return {
        // ...state,
        initialState,
      }
      break
    case 'SET_TICKIT_TYPE':
      return {
        ...state,
        tickitType: action.payload,
      }
      break

    default:
      return state
      break
  }
}
export default checkData
