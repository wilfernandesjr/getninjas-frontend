import { validate } from './validate'

describe('validate.cep method should...', () => {
  test('return false to empty entry', () => {
    expect(validate.cep()).toBe(false)
  })

  test('return false to an entry with length less than 8', () => {
    expect(validate.cep('011')).toBe(false)
  })

  test('return true to a valid cep entry', () => {
    expect(validate.cep('01135020')).toBe(true)
  })
})

describe('validate.phone method should...', () => {
  test('return false to empty entry', () => {
    expect(validate.phone()).toBe(false)
  })

  test('return false to an entry with length less than 10 and more than 11', () => {
    expect(validate.phone('27')).toBe(false)
    expect(validate.phone('27995118191991')).toBe(false)
  })

  test('return true to a valid phone entry', () => {
    expect(validate.phone('27995118191')).toBe(true)
    expect(validate.phone('2730034040')).toBe(true)
  })
})

describe('validate.email method should...', () => {
  test('return false to empty entry', () => {
    expect(validate.email()).toBe(false)
  })

  test('return false to an invalid email entry', () => {
    expect(validate.email('wilmar')).toBe(false)
    expect(validate.email('wilmar.wfsj@gmail')).toBe(false)
    expect(validate.email('wilmar.wfsj@gmailcom')).toBe(false)
  })

  test('return true to a valid email entry', () => {
    expect(validate.email('wilmar.wfsj@gmail.com')).toBe(true)
    expect(validate.email('wil.fernandes@getninjas.com.br')).toBe(true)
  })
})