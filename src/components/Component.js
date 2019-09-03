import {
  toJSON
} from '../services/utils.js'

export class Component extends HTMLElement {
  constructor () {
    super()
    this.props = {
      key: '',
      field: {},
      message: ''
    }
  }

  render () {
    this.innerHTML = ''
  }

  static get observedAttributes () {
    return ['key', 'field', 'message']
  }

  attributeChangedCallback (name, oldVal, newVal) {
    this.props[name] = name === 'field' ? toJSON(newVal) : newVal
    this.render()
  }
}
