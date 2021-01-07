import axios from 'axios'

const Api = {
  get: async (url = '', params = {}) => {
    let res = ''
    try {
      res = await axios.get(url, { params })
      return res
    } catch (error) {
      console.log('error', error)
    }
    return res
  },

  post: async (url = '', data = {}, headers = {}) => {
    let res = ''
    try {
      console.log('url', url)
      res = await axios.post(url, data, headers)
      console.log('resapi1', res)
    } catch (error) {
      console.log('error', error)
    }
    return res
  },
}

export default Api
