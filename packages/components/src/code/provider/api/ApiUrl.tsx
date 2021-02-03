const BaseUrl = 'https://cxpdev.merilent.com/api/'
const ticket = 'ticket/'
const transalate = 'translation/'

export const configs = {
  loginApi: 'https://cxpdev.merilent.com/auth/api_token_obtain/',
  search_complaints: `${BaseUrl}${ticket}search_complaints`,
  log_activity: `${BaseUrl}${ticket}log_activity`,
  get_status: `${BaseUrl}${ticket}get_status/`,
  get_activity: `${BaseUrl}${ticket}get_activity/`,
  translate_text: `${BaseUrl}${transalate}translate_text`,
  batch_update_control_option: `${BaseUrl}${ticket}get_controls_with_data?client_id=39&group_id=3`,
  batch_complaint_update: `${BaseUrl}${ticket}batch_complaint_update`,
  forward_to_external_agent: `${BaseUrl}${ticket}forward_to_external_agent`,
  delete_complaints: `${BaseUrl}${ticket}delete_complaints`,
  block_user: `${BaseUrl}${ticket}block_user`,
  mark_complaint_unread: `${BaseUrl}${ticket}mark_complaint_unread`,
}
