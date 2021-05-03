const BaseUrl = 'https://cxpdev.merilent.com/'
const Api = 'api/'
const ticket = 'ticket/'

export const configs = {
  loginApi: `${BaseUrl}auth/api_token_obtain/`,
  search_complaints: `${BaseUrl}${Api}${ticket}search_complaints`, // searchComplaints
  log_activity: `${BaseUrl}${Api}${ticket}log_activity`,
  get_status: `${BaseUrl}${Api}${ticket}get_status/`, // To get status
  get_activity: `${BaseUrl}${Api}${ticket}get_activity/`,
  translate_text: `${BaseUrl}${Api}translation/translate_text`,
  batch_update_control_option: `${BaseUrl}${Api}${ticket}get_controls_with_data?client_id=39&group_id=3`,
  batch_complaint_update: `${BaseUrl}${Api}${ticket}batch_complaint_update`,
  forward_to_external_agent: `${BaseUrl}${Api}${ticket}forward_to_external_agent`,
  delete_complaints: `${BaseUrl}${Api}${ticket}delete_complaints`,
  block_user: `${BaseUrl}${Api}${ticket}block_user`,
  mark_complaint_unread: `${BaseUrl}${Api}${ticket}mark_complaint_unread`,
  tickit_forward: `${BaseUrl}${Api}${ticket}forward_to_external_agent`, // To forward Interaction to email
  add_message_to_queue: `${BaseUrl}queuemanager/add_message_to_queue`,
  dynamic_canned_response: `${BaseUrl}${Api}${ticket}get_dynamic_canned_response/`,
  dynamic_get_controls: `${BaseUrl}${Api}${ticket}get_controls_with_data?client_id=39&group_id=2`,
  userDetails: `${BaseUrl}${Api}${ticket}get_user_complaints/39/200360`,
  userUpdate: `${BaseUrl}${Api}user/update_user_details`,
  mark_influencer_detractor: `${BaseUrl}${Api}user/mark_user?user_id=200360`,
  ratingLink: `${BaseUrl}${Api}get_ratings_url`,
  getUserDetails: `${BaseUrl}${Api}user/get_user_details/`,
  mediaList: `${BaseUrl}${Api}${ticket}get_medium_details`,
  headerList: `${BaseUrl}${Api}client/complaint_list_columns`, // headerList
  verifyUser: `${BaseUrl}${Api}verify_user`, // verify user
  dynamicFilter: `${BaseUrl}${Api}${ticket}get_controls_with_data?client_id=39&group_id=1`, // To get dynamic filters options
}
