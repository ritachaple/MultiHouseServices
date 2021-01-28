const BaseUrl = 'https://cxpdev.merilent.com/api/'
const ticket = 'ticket/'
const transalate = 'translation/'

export const configs = {
  loginApi: '',
  search_complaints: `${BaseUrl}${ticket}search_complaints`,
  log_activity: `${BaseUrl}${ticket}log_activity`,
  get_status: `${BaseUrl}${ticket}get_status/`,
  get_activity: `${BaseUrl}${ticket}get_activity/`,
  translate_text: `${BaseUrl}${transalate}translate_text`,
}
