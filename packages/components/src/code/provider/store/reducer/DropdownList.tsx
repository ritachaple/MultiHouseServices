const initialState = {
  statusDropdownList: [] as any,
  priorityDropdownList: [] as any,
  assigneeDropdownList: [] as any,
}

const dropdownListData = (state = { initialState }, action: any) => {
  switch (action.type) {
    case 'SET_STATUS_DROPDOWN_LIST':
      return {
        ...state,
        statusDropdownList: action.payload,
      }
    case 'PRIORITY_LIST':
      return {
        ...state,
        priorityDropdownList: action.payload,
      }
    case 'ASSIGNEE_LIST':
      return {
        ...state,
        assigneeDropdownList: action.payload,
      }
    default:
      return state
  }
}

export default dropdownListData
