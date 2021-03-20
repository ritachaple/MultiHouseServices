import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'

export const searchComplaintsApi = async (
  token: string,
  pageSize: number,
  pageIndex: number,
  startDate: any,
  endDate: any,
  mediumId?: any,
) => {
  const medum = mediumId || []
  let res: any = {}
  try {
    const data = {
      client_id: 39,
      status: [],
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
      search_text: '',
      page_index: pageIndex,
      agent_id: 5889,
      medium: medum,
    }
    // console.log('search_complaintsRes1')

    res = await Api.post(configs.search_complaints, data, `${token}`)
    // console.log('searchcomplaintsRes', res)
  } catch (error) {
    console.log('error: ', error)
  }
  return res
}
