import { combineReducers } from 'redux'
import dropdownListData from './DropdownList'
import headerData from './HeaderData'
import loginReducer from './Login'
import tickitListData from './Tickits'

export default combineReducers({
  headerData,
  loginReducer,
  tickitListData,
  dropdownListData,
})
