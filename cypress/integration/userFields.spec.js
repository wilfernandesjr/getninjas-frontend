const renderUserFields = cy => {
  cy.visit('http://localhost:8080/public/')
  cy.get('#request_fields_enumerable_0').select('Corte')
  cy.get('#request_fields_enumerable_3').select('Nos próximos 30 dias')
  cy.get('#request_fields form').submit()
}

describe('User Fields Form...', function() {
  it('should be visible after request fields form is properly filled', function() {
    cy.visit('http://localhost:8080/public/')

    cy.get('#user_fields').should('not.be.visible')

    cy.get('#request_fields_enumerable_0').select('Corte')
    cy.get('#request_fields_enumerable_3').select('Nos próximos 30 dias')
    cy.get('#request_fields form').submit()

    cy.get('#user_fields').should('be.visible')
  })

  it('should have its header rendered correctly', function() {
    renderUserFields(cy)

    cy.contains('Estamos quase lá')
      .should('be.visible')
    
    cy.contains('Não perca tempo ligando para vários profissionais.')
      .should('be.visible')
  })

  it('should have its all related fields visibles', function() {
    renderUserFields(cy)

    cy.get('[key="user_fields_cep_0"] label').contains('CEP')
    cy.get('#user_fields_cep_0').should('be.visible')

    cy.get('[key="user_fields_small_text_1"] label').contains('Nome')
    cy.get('#user_fields_small_text_1').should('be.visible')

    cy.get('[key="user_fields_email_2"] label').contains('Email')
    cy.get('#user_fields_email_2').should('be.visible')

    cy.get('[key="user_fields_phone_3"] label').contains('Celular')
    cy.get('#user_fields_phone_3').should('be.visible')
  })

  it('should be the only tab visible', function() {
    renderUserFields(cy)

    cy.get('#request_fields').should('not.be.visible')
    cy.get('#user_fields').should('be.visible')
    cy.get('#success_submit').should('not.be.visible')
  })

  it('should have its own tab indicator activated', function() {
    renderUserFields(cy)

    cy.get('[data-nav-request]').should('not.have.class', 'tabsList__item--active')
    cy.get('[data-nav-user]').should('have.class', 'tabsList__item--active')
  })

  it('should warn user when the cep required field is not filled properly', function() {
    renderUserFields(cy)

    cy.get('#user_fields_cep_0').focus()
    cy.get('#user_fields').click()
    cy.get('[key="user_fields_cep_0"] .inputItem__message')
      .contains('Preencha esse campo corretamente')
      .should('be.visible')

    cy.get('#user_fields_cep_0').type('011asasa')
    cy.get('#user_fields').click()
    cy.get('[key="user_fields_cep_0"] .inputItem__message')
      .contains('Preencha esse campo corretamente')
      .should('be.visible')

    cy.get('#user_fields_cep_0').type('01135020')
    cy.get('#user_fields').click()
    cy.get('[key="user_fields_cep_0"] .inputItem__message').should('not.be.visible')
  })

  it('should warn user when the name required field is not filled properly', function() {
    renderUserFields(cy)

    cy.get('#user_fields_small_text_1').focus()
    cy.focused().blur()
    cy.get('[key="user_fields_small_text_1"] .inputItem__message')
      .contains('Preencha esse campo corretamente')
      .should('be.visible')

    cy.get('#user_fields_small_text_1').type('Wil Fernandes')
    cy.focused().blur()
    cy.get('[key="user_fields_small_text_1"] .inputItem__message').should('not.be.visible')
  })

  it('should warn user when the email required field is not filled properly', function() {
    renderUserFields(cy)

    cy.get('#user_fields_email_2').focus()
    cy.focused().blur()
    cy.get('[key="user_fields_email_2"] .inputItem__message')
      .contains('Preencha esse campo corretamente')
      .should('be.visible')

    cy.get('#user_fields_email_2').type('wilmar.wfsj@gmail')
    cy.get('#user_fields').click()
    cy.get('[key="user_fields_email_2"] .inputItem__message').should('be.visible')
    cy.get('#user_fields_email_2').clear()

    cy.get('#user_fields_email_2').type('wilmar.wfsj@gmail.com')
    cy.get('#user_fields').click()
    cy.get('[key="user_fields_email_2"] .inputItem__message').should('not.be.visible')
    cy.get('#user_fields_email_2').clear()
  })

  it('should warn user when the phone required field is not filled properly', function() {
    renderUserFields(cy)

    cy.get('#user_fields_phone_3').focus()
    cy.focused().blur()
    cy.get('[key="user_fields_phone_3"] .inputItem__message')
      .contains('Preencha esse campo corretamente')
      .should('be.visible')

    cy.get('#user_fields_phone_3').type('2799511')
    cy.get('#user_fields').click()
    cy.get('[key="user_fields_phone_3"] .inputItem__message').should('be.visible')
    cy.get('#user_fields_phone_3').clear()

    cy.get('#user_fields_phone_3').type('27995118191')
    cy.get('#user_fields').click()
    cy.get('[key="user_fields_phone_3"] .inputItem__message').should('not.be.visible')
    cy.get('#user_fields_phone_3').clear()
  })

  it('should submit a form and became invisible when all required fields are properly filled', function() {
    renderUserFields(cy)

    cy.get('#user_fields_cep_0').type('01135020')
    cy.get('#user_fields_small_text_1').type('Wil Fernandes')
    cy.get('#user_fields_email_2').type('wilmar.wfsj@gmail.com')
    cy.get('#user_fields_phone_3').type('27995118191')
    cy.get('#user_fields form').submit()

    cy.get('#user_fields').should('not.be.visible')
  })
})