export const initialState = {
  token: '',
  userDetails: '',
  clientDetails: '',
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
    case 'VERIFY_USER':
      return {
        ...state,
        userDetails: action.payload,
      }
      break
    case 'CLIENT_DETAIL':
      return {
        ...state,
        clientDetails: action.payload,
      }
      break
    default:
      return state
      break
  }
}

export default loginReducer
