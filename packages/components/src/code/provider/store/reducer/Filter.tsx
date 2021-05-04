const med: string[] = []
const pri: string[] = []
const stat: string[] = []

const initialState = {
  medium: med,
  priority: pri,
  status: stat,
  isFilterHeader: true,
  showBotsComplaints: '',
  brandPost: '',
  spam: '',
  deleted: '',
  handles: '',
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
    case 'CLEAR_SELECTED_PRIORITY':
      return {
        ...state,
        priority: [],
      }
      break
    case 'SELECTED_STATUS':
      return {
        ...state,
        status: action.payload,
      }
      break
    case 'CLEAR_SELECTED_STATUS':
      return {
        ...state,
        status: [],
      }
      break
    case 'SET_FILTER_HEADER':
      return {
        ...state,
        isFilterHeader: true,
      }
      break
    case 'CLEAR_FILTER_HEADER':
      return {
        ...state,
        isFilterHeader: false,
      }
      break
    case 'SHOW_BOTS_COMPLAINTS':
      return {
        ...state,
        showBotsComplaints: action.payload,
      }
      break
    case 'BRAND_POST':
      return {
        ...state,
        brandPost: action.payload,
      }
      break
    case 'SPAM':
      return {
        ...state,
        spam: action.payload,
      }
      break
    case 'DELETED':
      return {
        ...state,
        deleted: action.payload,
      }
      break
    case 'HANDLES':
      return {
        ...state,
        handles: action.payload,
      }
      break

    default:
      return state
      break
  }
}

export default Filter
