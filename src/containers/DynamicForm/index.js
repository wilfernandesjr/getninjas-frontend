import html from 'tagged-template-noop'
import {
  renderElement,
  stringify,
  toJSON
} from '../../services/utils'
import '../Tab'

class DynamicForm extends HTMLElement {
  connectedCallback () {
    this.props = {
      forms: toJSON(this.getAttribute('forms'))
    }
    this.render()

    this.addEventListener('submit-request', this.goToUserTab.bind(this))
    this.addEventListener('submit-user', this.goToSuccessTab.bind(this))
  }

  goToUserTab(e) {
    const $ = el => this.querySelector(el)
    $('[key="request_fields"]').setAttribute('status', 'inactive')
    $('[key="user_fields"]').setAttribute('status', 'active')
    $('[data-nav-request]').classList.remove('tabsList__item--active')
    $('[data-nav-user]').classList.add('tabsList__item--active')
  }

  goToSuccessTab(e) {
    const $ = el => this.querySelector(el)
    $('[key="user_fields"]').setAttribute('status', 'inactive')
    $('[key="success_submit"]').setAttribute('status', 'active')
    $('[data-nav-user]').classList.remove('tabsList__item--active')
  }

  render () {
    const { forms } = this.props
    renderElement(this, html`
      <div class="dynamicForm">
        <div class="dynamicForm__tabs">
          <div class="tabs">
            <tab-container
              key="request_fields"
              title="Explique o que você precisa"
              description="Peça orçamento grátis, online!"
              submit-text="Buscar Profissionais"
              status="active"
              fields='${stringify(forms.request_fields)}'
            ></tab-container>
            <tab-container
              key="user_fields"
              title="Estamos quase lá"
              description="Não perca tempo ligando para vários profissionais. <strong>Preencha os dados abaixo e nós encontraremos os melhores pra você!</strong>"
              theme="grey"
              image="assets/images/phone_call.svg"
              submit-text="Finalizar"
              status="inactive"
              fields='${stringify(forms.user_fields)}'
            ></tab-container>
            <tab-container
              key="success_submit"
              title="Pronto!"
              description="Agora é só esperar os profissionais te procurarem. 👌🏽"
              image="assets/images/phone_call.svg"
              status="inactive"
            ></tab-container>
          </div>
        </div>
        <ol class="tabsList">
          <li data-nav-request class="tabsList__item tabsList__item--active">1. Seu pedido</li>
          <li data-nav-user class="tabsList__item">2. Seus dados</li>
        </ol>
      </div>
    `)
  }
}

customElements.define('dynamic-form', DynamicForm)
document.createElement('dynamic-form')
