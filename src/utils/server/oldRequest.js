// Токен для взаимодействия с API(берётся в личном кабинете разработчика Yclient)
const TOKEN = process.env.VUE_APP_YCLIENT_TOKEN

// Ссылка на API yclient
const SERVER_URL = `https://api.yclients.com/api/v1`

export default async function (url, method = 'GET', data = null, headers = {}) {
  try {
    let body

    headers['Accept'] = 'application/vnd.api.v2+json'
    headers['Authorization'] = `Bearer ${TOKEN}`

    if (data) {
      headers['Content-Type'] = 'application/json'

      body = JSON.stringify(data)
    }
    const response = await fetch(`${SERVER_URL}/${url}`, {
      method,
      headers,
      body,
      // mode: 'no-cors',
    })

    const dataResponse = {
      status: response.status,
      body: null,
    }
    try {
      dataResponse.body = await response.json()
    } catch (e) {
      console.warn('Error:', e.message)
    }
    return dataResponse
  } catch (e) {
    console.warn('Error:', e.message)
  }
}
