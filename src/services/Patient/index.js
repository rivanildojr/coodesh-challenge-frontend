const DEFAULT_PAGINATION = {
  page: 0,
  results: 50
}

export default httpClient => ({
  getAll: async ({ page, results } = DEFAULT_PAGINATION) => {
    const query = { page, results }

    const response = await httpClient.get('/', { params: query })

    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  },
  getOne: async ({ id }) => {
    const response = await httpClient.get(`/?id=${id}`)

    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  }
})
