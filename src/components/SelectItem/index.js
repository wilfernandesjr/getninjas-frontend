import html from 'tagged-template-noop'
import {
  renderElement,
  toJSON
} from '../../services/utils.js'
import { Component } from '../Component'

class SelectItem extends Component {
  connectedCallback () {
    this.props = {
      key: this.getAttribute('key'),
      field: toJSON(this.getAttribute('field')),
      message: this.getAttribute('message')
    }
    this.render()

    const $select = this.querySelector('select')
    $select.addEventListener('focusout', this.handleChange.bind(this))
  }

  handleChange (e) {
    const $select = e.currentTarget
    const $selectWrapper = this.querySelector('.selectItem')
    if (!$select.value && $select.getAttribute('required')) {
      return $selectWrapper.classList.add('has-error')
    }
    $selectWrapper.classList.remove('has-error')
  }

  render () {
    const { key, field, message } = this.props
    renderElement(this, html`
      <div class="selectItem" data-wrapper>
        ${field.label ? `<label for="${key}">${field.label}</label>` : ''}
        <select
          id="${key}"
          class="selectItem__input"
          ${field.required ? 'required="true"' : ''}
        >
          <option selected value="">${field.mask}</option>
          ${Object.keys(field.values || []).map(value => `
            <option value="${field.values[value]}">${field.values[value]}</option>
          `).join('')}
        </select>
        <span class="selectItem__message">${message}</span>
      </div>
    `)
  }
}

customElements.define('select-item', SelectItem)
document.createElement('select-item')
