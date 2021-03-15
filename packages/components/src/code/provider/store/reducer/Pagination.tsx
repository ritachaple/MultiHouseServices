const initialState = {
  pageIndex: 1,
  pageSize: 5,
  totalRecords: 0,
}

const Pagination = (state = { initialState }, action: any) => {
  switch (action.type) {
    case 'PAGE_INDEX':
      return {
        ...state,
        pageIndex: action.payload,
      }
    case 'PAGE_SIZE':
      return {
        ...state,
        pageSize: action.payload,
      }
    case 'TOTAL_RECORDS':
      return {
        ...state,
        totalRecords: action.payload,
      }

    default:
      return state
  }
}

export default Pagination
