import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'

export const searchComplaintsApi = async (
  token: string,
  pageSize: number,
  pageIndex: number,
  startDate: any,
  endDate: any,
  mediumId?: any,
  priority?: any,
  status?: any,
  searchText?: string,
) => {
  const medum = mediumId || []
  const priorityList = priority || []
  const statusList = status || []
  let res: any = {}
  try {
    const data = {
      client_id: 39,
      status: statusList,
      priority: priorityList,
      department: [],
      is_deleted: false,
      is_spam: false,
      to_date: endDate,
      from_date: startDate,
      custom_filter: null,
      customer_responded: null,
      page_size: pageSize,
      assigned_to: [],
      order_by: '1',
      sort_order: 'DESC',
      search_text: searchText || '',
      page_index: pageIndex,
      agent_id: 5889,
      medium: medum,
    }
    console.log('datafilter', data)

    res = await Api.post(configs.search_complaints, data, `${token}`)
    // console.log('searchcomplaintsRes', res)
  } catch (error) {
    console.log('error: ', error)
  }
  return res
}

export const logActivityApi = async (data: any, token: string) => {
  let res: any = {}
  try {
    res = await Api.post(configs.log_activity, data, token)
  } catch (error) {
    console.error(error)
  }
  return res
}
