// функция преобразует объект в квери параметр

export function objToQuery(obj) {
  let param
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    if (typeof value === 'object') {
      value.forEach((el) => {
        param = addToParam(param, key + '=' + el)
      })
    } else {
      param = addToParam(param, key + '=' + value)
    }
  })
  return param
}

function addToParam(param, value) {
  if (param) {
    return param + '&' + value
  } else {
    return '?' + value
  }
}
