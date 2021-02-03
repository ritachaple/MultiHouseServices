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
      break
    default:
      return state
      break
  }
}

export default loginReducer
