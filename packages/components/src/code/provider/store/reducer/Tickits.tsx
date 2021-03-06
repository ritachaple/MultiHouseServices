const initialState = {
  storeSelectedTickits: [] as any,
  tickitList: [],
  selectedTickit: {},
  selectedOneTickit: false,
}

const tickitListData = (state = { initialState }, action: any) => {
  switch (action.type) {
    case 'TICKIT_LIST':
      return {
        ...state,
        tickitList: action.payload,
      }
    case 'SELECT_TICKIT':
      return {
        ...state,
        selectedTickit: action.payload,
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
