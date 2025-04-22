// Ссылка на API yclient
const SERVER_URL = `https://api.yclients.com/api/v1`

export default async function (url, method = 'GET', data = null, headers = {}) {
  try {
    let body

    headers['Accept'] = 'application/vnd.api.v2+json'

    headers['Content-Type'] = 'application/json'

    body = JSON.stringify({
      data,
      method,
      url: `${SERVER_URL}/${url}`,
    })

    const response = await fetch(
      `/wp-content/themes/onkoplus/boocking-api/boocking_app_new.php`,
      // `http://onkoplus/wp-content/themes/onkoplus/boocking-api/boocking_app_new.php`,
      {
        method: 'POST',
        headers,
        body,
        // mode: 'no-cors',
      }
    )
    console.log(response)

    const dataResponse = {
      status: response.status,
      body: null,
    }
    try {
      dataResponse.body = await response.json()
    } catch (e) {
      console.warn('Error:', e.message)
    }

    console.log(dataResponse)

    return dataResponse
  } catch (e) {
    console.warn('Error:', e.message)
  }
}
