import { renderElement, toJSON } from '../../services/utils.js'

import { Component } from '../Component'

class InputItem extends Component {
  connectedCallback () {
    this.props = {
      key: this.getAttribute('key'),
      field: toJSON(this.getAttribute('field')),
      message: this.getAttribute('message')
    }
    this.render()

    const $textarea = this.querySelector('input')
    $textarea.addEventListener('focusout', this.handleChange.bind(this))
  }

  handleChange (e) {
    const $input = e.currentTarget
    if (!$input.value && $input.getAttribute('required')) {
      return this.classList.add('has-error')
    }
    this.classList.remove('has-error')
  }

  render () {
    const { key, field, message } = this.props
    renderElement(this, `
      <div class="inputItem">
        ${field.label ? `<label for="${key}">${field.label}</label>` : ''}
        <input
          type="text"
          id="${key}"
          placeholder="${field.placeholder}"
          ${field.required ? 'required="true"' : ''}
        >
        ${field.required ? '<span class="inputItem__message">${message}</span>' : ''}
      </div>
    `)
  }
}

customElements.define('input-item', InputItem)
document.createElement('input-item')

