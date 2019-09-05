const renderBothForms = cy => {
  cy.visit('http://localhost:8080/public/')
  cy.get('#request_fields_enumerable_0').select('Corte')
  cy.get('#request_fields_enumerable_3').select('Nos próximos 30 dias')
  cy.get('#request_fields form').submit()

  cy.get('#user_fields_cep_0').type('01135020')
  cy.get('#user_fields_small_text_1').type('Wil Fernandes')
  cy.get('#user_fields_email_2').type('wilmar.wfsj@gmail.com')
  cy.get('#user_fields_phone_3').type('27995118191')
  cy.get('#user_fields form').submit()
}

describe('Success Submit Tab...', function() {
  it('should be visible after both forms are correctly filled', function() {
    renderBothForms(cy)
    cy.get('#success_submit').should('be.visible')
  })

  it('should have its header rendered correctly', function() {
    renderBothForms(cy)

    cy.contains('Pronto!')
      .should('be.visible')
    
    cy.contains('Agora é só esperar os profissionais te procurarem')
      .should('be.visible')
  })

  it('should be the only tab visible', function() {
    renderBothForms(cy)

    cy.get('#request_fields').should('not.be.visible')
    cy.get('#user_fields').should('not.be.visible')
    cy.get('#success_submit').should('be.visible')
  })

  it('should not have any tab indicator activated', function() {
    renderBothForms(cy)

    cy.get('[data-nav-request]').should('not.have.class', 'tabsList__item--active')
    cy.get('[data-nav-request]').should('not.have.class', 'tabsList__item--active')
    cy.get('[data-nav-user]').should('not.have.class', 'tabsList__item--active')
  })
})