import request from './newRequest' // запрос к API yclient через серверную прослойку (для большей безопасности, id аккаунта не видно в запросах)
// import request from './oldRequest' // запрос напрямую к API yclient

import { objToQuery } from './queryParams'

export default {
  async post(url, data) {
    return await request(url, 'POST', data)
  },
  async get(url, queryParamObj = null) {
    // проверяем сущестует ли объект квери парметров, если да, то приводим к строке и добавляем к ссылке
    if (queryParamObj) {
      const queryParam = objToQuery(queryParamObj)
      url += queryParam
    }
    return await request(url, 'GET', null)
  },
}
