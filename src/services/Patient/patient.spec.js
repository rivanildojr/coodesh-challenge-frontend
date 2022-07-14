import mockAxios from 'axios'
import PatientService from '.'

jest.mock('axios')

describe('PatientService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the data user', async () => {
    const data = {
      results: [
        {
          gender: 'female',
          name: {
            title: 'Ms',
            first: 'Alea',
            last: 'Christoffersen'
          }
        }
      ],
      info: {
        seed: '2f10116f1799d353',
        results: 1,
        page: 1,
        version: '1.3'
      }
    }

    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data })
    })

    const response = await PatientService(mockAxios).getAll()

    expect(response.data).toHaveProperty('results')
  })

  it('should throw error in fail request', async () => {
    const errors = {
      status: 500,
      statusText: 'Server Error'
    }

    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors })
    })

    const response = await PatientService(mockAxios).getAll()

    expect(response.errors).toHaveProperty('status')
    expect(response.errors).toHaveProperty('statusText')
  })
})
