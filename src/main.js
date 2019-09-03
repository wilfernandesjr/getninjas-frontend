import { DynamicForm } from './containers/DynamicForm'

import { getForm } from './services/getForm'

class MainApp extends HTMLElement {
  static get observedAttributes () {
    return ['data-name']
  }

  async render () {
    const forms = (await getForm())._embedded
    this.innerHTML = DynamicForm({ forms })
  }

  async connectedCallback () {
    await this.render()
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    this.render()
  }
}

customElements.define('main-app', MainApp)
const $app = document.createElement('main-app')

const $wrapper = document.querySelector('[data-app]')
$wrapper.appendChild($app)
