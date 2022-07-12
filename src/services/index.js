import axios from 'axios'

import PatientService from './Patient'

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

httpClient.interceptors.response.use(response => {
  return response
}, (error) => {
  const canThrowAnError = error.request.status === 0 || error.request.status === 500

  if (canThrowAnError) throw new Error(error.message)

  return error
})

export default {
  patient: PatientService(httpClient)
}
