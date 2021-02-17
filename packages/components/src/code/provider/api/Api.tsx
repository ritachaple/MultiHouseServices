import axios from 'axios'

const Api = {
  get: async (url = '', token = '', params = {}) => {
    let res = ''
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }
    try {
      res = await axios.get(url, config)
      return res
    } catch (error) {
      console.log('error', error)
    }
    return res
  },

  post: async (url = '', data = {}, token = '') => {
    let res = ''
    try {
      console.log('url', url)

      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json, text/plain',
          'Accept-Language': 'en,en-US;q=0.9,en-GB;q=0.8',
          Connection: 'keep-alive',
          'Content-Type': 'application/json;charset=UTF-8',
          Cookie:
            'ARRAffinity=7a2d82d3e8632b22a3a102b4349fdda715ee7ac9651d369119133a1f1b3957a2; ARRAffinitySameSite=7a2d82d3e8632b22a3a102b4349fdda715ee7ac9651d369119133a1f1b3957a2',
          Origin: 'https://cxpdev.merilent.com',
          Referer: 'https://cxpdev.merilent.com/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        },
      }

      res = await axios.post(url, data, header)
      // res = await axios.post("https://cxpdev.merilent.com/api/ticket/get_dynamic_canned_response/",
      // {"client_id":39,"params":{"address_book":{},"email_template":{},"canned_response":{}}}, header)
      console.log('resapi1', res)
    } catch (error) {
      console.log('error', error)
    }
    return res
  },

  put: async (url = '', data = {}, token = '') => {
    let res = ''
    try {
      console.log('url', url)

      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json, text/plain',
          'Accept-Language': 'en,en-US;q=0.9,en-GB;q=0.8',
          Connection: 'keep-alive',
          'Content-Type': 'application/json;charset=UTF-8',
          Cookie:
            'ARRAffinity=7a2d82d3e8632b22a3a102b4349fdda715ee7ac9651d369119133a1f1b3957a2; ARRAffinitySameSite=7a2d82d3e8632b22a3a102b4349fdda715ee7ac9651d369119133a1f1b3957a2',
          Origin: 'https://cxpdev.merilent.com',
          Referer: 'https://cxpdev.merilent.com/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        },
      }

      res = await axios.put(url, data, header)
      // res = await axios.post("https://cxpdev.merilent.com/api/ticket/get_dynamic_canned_response/",
      // {"client_id":39,"params":{"address_book":{},"email_template":{},"canned_response":{}}}, header)
      console.log('put api res', res)
    } catch (error) {
      console.log('error', error)
    }
    return res
  },
}

export default Api
