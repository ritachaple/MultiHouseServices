const initialState = {
  tickitList: [],
}

const tickitListData = (state = { initialState }, action: any) => {
  switch (action.type) {
    case 'TICKIT_LIST':
      return {
        ...state,
        tickitList: action.payload,
      }
    default:
      return state
  }
}

export default tickitListData
