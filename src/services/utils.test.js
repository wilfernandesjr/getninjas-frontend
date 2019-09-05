import {
  renderElement,
  stringify,
  toJSON
} from './utils'

describe('renderElement method should...', () => {
  test('return target with innerHTML according to htmlStr entry', () => {
    const target = { innerHTML: '' }
    const htmlStr = '<input type="text">'
    expect(renderElement(target, htmlStr)).toMatchObject({
      innerHTML: '<input type="text">'
    })
  })
})

describe('stringify method should...', () => {
  test('return object stringified', () => {
    const obj = { innerHTML: '' }
    expect(stringify(obj)).toBe(`{\"innerHTML\":\"\"}`)
  })
})

describe('toJSON method should...', () => {
  test('return string objetified', () => {
    const str = `{\"innerHTML\":\"\"}`
    expect(toJSON(str)).toMatchObject({ innerHTML: '' })
  })
})
