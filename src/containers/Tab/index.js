import {
  element,
  stringify
} from '../../services/utils.js'
import '../../components/SelectItem'
import '../../components/TextareaItem'
import '../../components/InputItem'

const chooseComponent = (field = {}, tabId = '', index) => {
  switch (field.type) {
    case 'enumerable':
      return element(`
        <select-item
          key="${tabId}_${field.type}_${index}"
          message="Esse campo é obrigatório"
          field='${stringify(field)}'
        >
        </select-item>
      `)
    case 'big_text':
      return element(`
        <textarea-item
          key="${tabId}_${field.type}_${index}"
          message="Esse campo é obrigatório"
          field='${stringify(field)}'
        >
        </textarea-item>
      `)
    case 'small_text':
    case 'cep':
    case 'email':
    case 'phone':
      return element(`
        <input-item
          key="${tabId}_${field.type}_${index}"
          message="Esse campo é obrigatório"
          field='${stringify(field)}'
        >
        </input-item>
      `)
  }
}

export const Tab = ({
  id = '',
  title = '',
  description = '',
  image = '',
  submitText = '',
  fields = []
}) => element(`
  <section class="tab" id="${id}">
    <div class="tab__header">
      ${image ? `<img src="${image}" alt="${description}">` : ''}
      <h2 class="tab__title">${title}</h2>
      <span class="tab__description">${description}</span>
    </div>
    <form class="tab__form">
      ${fields.map((field, index) => chooseComponent(field, id, index)).join('')}
      <div class="submitWrapper">
        <input type="submit" value="${submitText}">
      </div>
    </form>
  </section>
`)
