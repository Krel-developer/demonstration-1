import server from './server'

// Id формы онлайн-записи YCLient
const FORM_ID = process.env.VUE_APP_YCLIENT_FORM_ID

// Id филилала для записи, береться из настроек Формы запрос ../bookform/id
const COMPANY_ID = process.env.VUE_APP_YCLIENT_COMPANY_ID

export default {
  async getFormOptions() {
    const res = await server.get(`bookform/${FORM_ID}/`)
    console.log(res)
  },
  async getServices(staffsId) {
    let data
    if (staffsId) {
      data = {
        staff_id: staffsId,
      }
    }
    const services = await server.get(`book_services/${COMPANY_ID}/`, data)

    return services?.body?.data?.services
  },
  async getStaffs(serviceId) {
    let data
    if (serviceId) {
      data = {
        service_ids: serviceId,
      }
    }
    const staffs = await server.get(`book_staff/${COMPANY_ID}`, data)

    return staffs.body.data
  },
  async getDays(serviceId, staffId) {
    const days = await server.get(`book_dates/${COMPANY_ID}`, {
      service_ids: serviceId,
      staff_id: staffId,
    })

    return days.body.data
  },
  async getTimes(serviceId, staffId, date) {
    const times = await server.get(
      `book_times/${COMPANY_ID}/${staffId}/${date}`,
      {
        service_ids: serviceId,
      }
    )

    return times.body.data
  },

  async boockRecord(data) {
    const record = await server.post(`book_record/${COMPANY_ID}`, data)
    return record
  },

  async getRecord() {
    // всё работает, поэтому в базу данных наджол будет сохранять record_id и record_hash, что бы можно было запрашивать информацию по записям
    const record_id = 885794057
    const record_hash = '745a27bbf56fd9cfdf6a64cc67e3bd9c'

    const record = await server.get(
      `book_record/${COMPANY_ID}/${record_id}/${record_hash}`
    )

    return record
  },
  async getBookCode(data) {
    const code = await server.post(`book_code/${COMPANY_ID}`, data)
    return code
  },
}
