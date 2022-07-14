const DEFAULT_PAGINATION = {
  page: 0,
  results: 50
}

export default httpClient => ({
  getAll: async ({ page, results, seed } = DEFAULT_PAGINATION) => {
    let query = { page, results }

    if (seed) query = { ...query, seed }

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
  }
})
