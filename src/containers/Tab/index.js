import html from 'tagged-template-noop'
import {
  renderElement,
  toJSON,
  stringify
} from '../../services/utils.js'
import { validate } from '../../services/validate.js'
import '../../components/SelectItem'
import '../../components/TextareaItem'
import '../../components/InputItem'

const getComponentByType = (field = {}, tabId = '', index) => {
  switch (field.type) {
    case 'enumerable':
      return html`
        <select-item
          key="${tabId}_${field.type}_${index}"
          message="Esse campo é obrigatório"
          field='${stringify(field)}'
        >
        </select-item>
      `
    case 'big_text':
      return html`
        <textarea-item
          key="${tabId}_${field.type}_${index}"
          message="Esse campo é obrigatório"
          field='${stringify(field)}'
        >
        </textarea-item>
      `
    case 'small_text':
    case 'cep':
    case 'email':
    case 'phone':
      return html`
        <input-item
          key="${tabId}_${field.type}_${index}"
          message="Preencha esse campo corretamente"
          field='${stringify(field)}'
          theme="${
            (field.type === 'cep' || field.type === 'phone') ? 'short' : ''
          }">
        </input-item>
      `
  }
}

class TabContainer extends HTMLElement {
  connectedCallback () {
    this.props = {
      key: this.getAttribute('key'),
      title: this.getAttribute('title'),
      description: this.getAttribute('description'),
      image: this.getAttribute('image'),
      submitText: this.getAttribute('submit-text'),
      theme: this.getAttribute('theme'),
      fields: toJSON(this.getAttribute('fields'))
    }
    this.render()

    this.querySelector('form').addEventListener(
      'submit', this.submitHandler.bind(this)
    )
  }

  isValid (form) {
    let errors = 0
    this.props.fields.forEach((field, index) => {
      if (!field.required) return

      const element = document.querySelector(`#${form}_${field.type}_${index}`)

      if (!element.value) {
        errors++
        element.closest('[data-wrapper]').classList.add('has-error')
        return 
      }

      if (field.type === 'cep' || field.type === 'phone' || field.type === 'email') {
        if (!validate[field.type](element.value)) {
          errors++
          element.closest('[data-wrapper]').classList.add('has-error')
        }
      }
    })

    return !errors
  }

  submitHandler(e) {
    e.preventDefault()
    const formsWrapper = document.querySelector('dynamic-form')

    if (this.props.key === 'request_fields' && this.isValid('request_fields')) {
      formsWrapper.dispatchEvent(new CustomEvent('submit-request'))
    }
    if (this.props.key === 'user_fields' && this.isValid('user_fields')) {
      formsWrapper.dispatchEvent(new CustomEvent('submit-user'))
    }
  }

  render () {
    const {
      key,
      title,
      description,
      image,
      submitText,
      theme,
      fields
    } = this.props
    renderElement(this, html`
      <section class="tab ${theme ? `tab--${theme}` : ''}" id="${key}">
        <div class="tab__header">
          ${image ? `<img src="${image}" alt="${description}">` : ''}
          <h2 class="tab__title">${title}</h2>
          <span class="tab__description">${description}</span>
        </div>
        <form class="tab__form">
          ${(fields || []).map(
            (field, index) => getComponentByType(field, key, index)
          ).join('')}
          ${submitText ? html`
            <div class="submitWrapper">
              <input type="submit" value="${submitText}">
            </div>
          ` : ''}
        </form>
      </section>
    `)
  }
}

customElements.define('tab-container', TabContainer)
document.createElement('tab-container')
