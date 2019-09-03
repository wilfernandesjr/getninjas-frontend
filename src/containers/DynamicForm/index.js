import { element } from '../../services/utils'
import { Tab } from '../Tab'

export const DynamicForm = ({ forms }) => element(`
  <div class="dynamicForm">
    <div class="dynamicForm__tabs">
      <div class="tabs">
        ${Tab({
          id: 'request_fields',
          title: 'Explique o que você precisa',
          description: 'Peça orçamento grátis, online!',
          submitText: 'Buscar Profissionais',
          fields: forms.request_fields
        })}
      </div>
    </div>
    <ol class="tabsList">
      <li class="tabsList__item tabsList__item--active">1. Seu pedido</li>
      <li class="tabsList__item">2. Seus dados</li>
    </ol>
  </div>
`)
