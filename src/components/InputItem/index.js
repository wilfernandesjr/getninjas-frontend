import html from 'tagged-template-noop'
import { renderElement, toJSON } from '../../services/utils.js'
import { validate } from '../../services/validate.js'
import { Component } from '../Component'

class InputItem extends Component {
  connectedCallback () {
    this.props = {
      key: this.getAttribute('key'),
      field: toJSON(this.getAttribute('field')),
      theme: this.getAttribute('theme'),
      message: this.getAttribute('message')
    }
    this.render()

    const $input = this.querySelector('input')
    $input.addEventListener('focusout', this.handleFocusout.bind(this))
    $input.addEventListener('keyup', this.handleKeyup.bind(this))
  }

  validate (element, field) {
    if (!field.required) return

    if (!element.value) {
      element.closest('[data-wrapper]').classList.add('has-error')
      return
    }

    if (field.type === 'cep' || field.type === 'phone' || field.type === 'email') {
      if (!validate[field.type](element.value)) {
        element.closest('[data-wrapper]').classList.add('has-error')
        return
      }
    }

    element.closest('[data-wrapper]').classList.remove('has-error')
  }

  handleFocusout (e) {
    const $input = e.currentTarget
    this.validate($input, this.props.field)
  }

  handleKeyup (e) {
    const { type } = this.props.field
    const { value } = e.currentTarget

    switch (type) {
      case 'cep':
        return e.currentTarget.value = value.replace(/\D/g, '').substring(0, 8)
      case 'phone':
        return e.currentTarget.value = value.replace(/\D/g, '').substring(0, 11)
    }
  }

  fallbackPlaceholder (type) {
    switch (type) {
      case 'cep':
        return 'Ex.: 01135020'
      case 'phone':
        return 'Ex.: 27995118191'
      case 'email':
        return 'Ex.: wilmar@gmail.com'
      default:
        return 'Digite aqui'
    }
  }

  render () {
    const { key, field, theme, message } = this.props
    renderElement(this, html`
      <div class="inputItem ${theme ? `inputItem--${theme}` : ''}" data-wrapper>
        ${field.label ? `<label for="${key}">${field.label}</label>` : ''}
        <input
          type="text"
          id="${key}"
          placeholder="${field.placeholder || this.fallbackPlaceholder(field.type)}"
          ${field.required ? 'required="true"' : ''}
        >
        ${field.required ? `<span class="inputItem__message">${message}</span>` : ''}
      </div>
    `)
  }
}

customElements.define('input-item', InputItem)
document.createElement('input-item')

