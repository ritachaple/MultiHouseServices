const med: string[] = []
const pri: string[] = []
const stat: string[] = []

const initialState = {
  medium: med,
  priority: pri,
  status: stat,
}

const Filter = (state = { initialState }, action: any) => {
  switch (action.type) {
    case 'SELECTED_MEDIUM':
      return {
        ...state,
        medium: action.payload,
      }
      break
    case 'CLEAR_SELECTED_MEDIUM':
      return {
        ...state,
        medium: [],
      }
      break
    case 'SELECTED_PRIORITY':
      return {
        ...state,
        priority: action.payload,
      }
      break
    case 'SELECTED_STATUS':
      return {
        ...state,
        status: action.payload,
      }
      break

    default:
      return state
      break
  }
}

export default Filter
