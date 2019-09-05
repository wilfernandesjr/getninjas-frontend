import 'babel-polyfill'
import { getForm } from './getForm'

describe('getForm method should...', () => {
  afterEach(() => {
    global.fetch.mockClear()
    delete global.fetch
  })

  test('return form model from api', async () => {
    expect.assertions(3)

    const mockResponse = Promise.resolve({
      _embedded: {
        request_fields: {}
      }
    })

    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => mockResponse
    }))

    const URL = 'https://c4t8tobheh.execute-api.us-east-1.amazonaws.com/production/forms'
    const response = await getForm()
                            
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(URL)
    expect(response).toMatchObject({ request_fields: {} })
  })
})
