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
  chatScreenFilter: {},
  isChatOMC: false,
  isChatPriority: false,
  isChatSBU: false,
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
    case 'SET_CHAT_SCREEN_FILTER':
      return {
        ...state,
        chatScreenFilter: action.payload,
      }
      break
    case 'CLR_CHAT_SCREEN_FILTER':
      return {
        ...state,
        chatScreenFilter: {},
      }
      break
    case 'CHAT_OMC_FILTER':
      return {
        ...state,
        isChatOMC: true,
      }
      break
    case 'CLR_CHAT_OMC_FILTER':
      return {
        ...state,
        isChatOMC: false,
      }
      break
    case 'CHAT_PRIORITY_FILTER':
      return {
        ...state,
        isChatPriority: true,
      }
      break
    case 'CLR_CHAT_PRIORITY_FILTER':
      return {
        ...state,
        isChatPriority: false,
      }
      break
    case 'CHAT_SBU_FILTER':
      return {
        ...state,
        isChatSBU: true,
      }
      break
    case 'CLR_CHAT_SBU_FILTER':
      return {
        ...state,
        isChatSBU: false,
      }
      break

    default:
      return state
      break
  }
}

export default Filter
