import { combineReducers } from 'redux'
import dropdownListData from './DropdownList'
import headerData from './HeaderData'
import loginReducer from './Login'
import Pagination from './Pagination'
import tickitListData from './Tickits'
import Filter from './Filter'

export default combineReducers({
  headerData,
  loginReducer,
  tickitListData,
  dropdownListData,
  Pagination,
  Filter,
})
