const date = new Date()
const sdate = new Date()
sdate.setDate(date.getDate() - 15)

const initialState = {
  storeSelectedTickits: [] as any,
  tickitList: [],
  selectedTickit: null,
  selectedOneTickit: false,
  endDate: date.toISOString(),
  startDate: sdate.toISOString(),
}

const startDate = new Date()
startDate.setDate(startDate.getDate() - 15)

const tickitListData = (state = { initialState }, action: any) => {
  switch (action.type) {
    case 'TICKIT_LIST':
      return {
        ...state,
        tickitList: action.payload,
      }
    case 'TICKIT_SELECT':
      return {
        ...state,
        selectedTickit: action.payload,
      }
    case 'CLEAR_SELECTED_TICKIT':
      return {
        ...state,
        selectedTickit: null,
      }
    case 'SELECT_ALL_TICKIT':
      return {
        ...state,
        selectedOneTickit: action.payload,
      }
    case 'STORE_SELECTED_TICKIT':
      return {
        ...state,
        storeSelectedTickits: action.payload,
      }
    case 'START_DATE':
      return {
        ...state,
        startDate: action.payload,
      }
    case 'END_DATE':
      return {
        ...state,
        endDate: action.payload,
      }
    default:
      return state
  }
}

export default tickitListData
