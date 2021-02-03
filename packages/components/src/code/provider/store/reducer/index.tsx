import { combineReducers } from 'redux'
import headerData from './HeaderData'
import loginReducer from './Login'

export default combineReducers({
  headerData,
  loginReducer,
})
