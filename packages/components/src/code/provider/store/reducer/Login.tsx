const initialState = {
  token: '',
}
const loginReducer = (state = { initialState }, action: any) => {
  switch (action.type) {
    case 'LOGIN_TOKEN':
      return {
        ...state,
        token: action.payload,
      }
    case 'CLEAR_LOGIN_TOKEN':
      return {
        ...state,
        token: '',
      }
      break
    default:
      return state
      break
  }
}

export default loginReducer
