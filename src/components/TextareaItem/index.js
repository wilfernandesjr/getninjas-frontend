import { renderElement, toJSON } from '../../services/utils.js'

import { Component } from '../Component'

class TextareaItem extends Component {
  connectedCallback () {
    this.props = {
      key: this.getAttribute('key'),
      field: toJSON(this.getAttribute('field')),
      message: this.getAttribute('message')
    }
    this.render()

    const $textarea = this.querySelector('textarea')
    $textarea.addEventListener('focusout', this.handleChange.bind(this))
  }

  handleChange (e) {
    const $textarea = e.currentTarget
    const $textareaWrapper = this.querySelector('.textareaItem')
    if (!$textarea.value && $textarea.getAttribute('required')) {
      return $textareaWrapper.classList.add('textareaItem--error')
    }
    $textareaWrapper.classList.remove('textareaItem--error')
  }

  render () {
    const { key, field, message } = this.props
    renderElement(this, `
      <div class="textareaItem">
        ${field.label ? `<label for="${key}">${field.label}</label>` : ''}
        <textarea
          id="${key}"
          placeholder="${field.placeholder}"
          ${field.required ? 'required="true"' : ''}
          minlength="3"
        ></textarea>
        <span class="textareaItem__message">${message}</span>
      </div>
    `)
  }
}

customElements.define('textarea-item', TextareaItem)
document.createElement('textarea-item')

