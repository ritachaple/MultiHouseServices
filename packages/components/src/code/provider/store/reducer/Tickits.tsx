const initialState = {
  storeSelectedTickits: [] as any,
  tickitList: [],
  selectedTickit: null,
  selectedOneTickit: false,
}

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
    default:
      return state
  }
}

export default tickitListData
