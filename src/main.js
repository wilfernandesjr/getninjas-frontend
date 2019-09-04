import html from 'tagged-template-noop'
import { renderElement, stringify } from './services/utils'
import { getForm } from './services/getForm'

import './containers/DynamicForm'

class MainApp extends HTMLElement {
  async connectedCallback () {
    this.props = {
      forms: await getForm()
    }
    this.render()
  }

  render () {
    const { forms } = this.props
    renderElement(this, html`
      <dynamic-form forms='${stringify(forms)}'></dynamic-form>
    `)
  }
}

customElements.define('main-app', MainApp)
const $app = document.createElement('main-app')

const $wrapper = document.querySelector('[data-app]')
$wrapper.appendChild($app)
