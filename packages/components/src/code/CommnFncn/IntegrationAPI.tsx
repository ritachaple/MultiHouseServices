import React, { useReducer } from 'react'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import { store } from '../provider/store'
import loginReducer from '../provider/store/reducer/Login'

function getStoreDetails() {
  console.log('store', store.getState())
}
getStoreDetails()

export const searchComplaintsApi = async (
  token: string,
  pageSize: number,
  pageIndex: number,
  startDate: any,
  endDate: any,
  clientId: any,
  userId: any,
  mediumId?: any,
  priority?: any,
  status?: any,
  searchText?: string,
  selShowBotsComplaints?: string,
  selBrandPost?: string,
  selSpam?: string,
  selDeleted?: string,
  selHandles?: string,
) => {
  const medum = mediumId || []
  const priorityList = priority || []
  const statusList = status || []
  let res: any = {}

  try {
    const data = {
      client_id: clientId,
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
      agent_id: userId,
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
