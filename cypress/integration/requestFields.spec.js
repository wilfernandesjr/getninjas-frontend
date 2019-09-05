describe('Request Fields Form...', function() {
  it('should have its header rendered correctly', function() {
    cy.visit('https://s3-sa-east-1.amazonaws.com/getninjas.wilfernandes.com.br/index.html')

    cy.contains('Explique o que você precisa')
      .should('be.visible')
    
    cy.contains('Peça orçamento grátis, online!')
      .should('be.visible')
  })

  it('should have all related fields visibles', function() {
    cy.visit('https://s3-sa-east-1.amazonaws.com/getninjas.wilfernandes.com.br/index.html')

    cy.get('[key="request_fields_enumerable_0"] label').contains('Qual será o serviço')
    cy.get('#request_fields_enumerable_0').should('be.visible')

    cy.get('[key="request_fields_enumerable_1"] label').contains('Para quem será')
    cy.get('#request_fields_enumerable_1').should('be.visible')

    cy.get('[key="request_fields_enumerable_2"] label').contains('O serviço será')
    cy.get('#request_fields_enumerable_2').should('be.visible')

    cy.get('[key="request_fields_enumerable_3"] label').contains('Para quando você')
    cy.get('#request_fields_enumerable_3').should('be.visible')

    cy.get('[key="request_fields_big_text_4"] label').contains('Informações')
    cy.get('#request_fields_big_text_4').should('be.visible')
  })

  it('should be the only tab visible', function() {
    cy.visit('https://s3-sa-east-1.amazonaws.com/getninjas.wilfernandes.com.br/index.html')

    cy.get('#request_fields').should('be.visible')
    cy.get('#user_fields').should('not.be.visible')
    cy.get('#success_submit').should('not.be.visible')
  })

  it('should warn user when a required field is not filled properly', function() {
    cy.visit('https://s3-sa-east-1.amazonaws.com/getninjas.wilfernandes.com.br/index.html')

    // Select empty value option
    cy.get('#request_fields_enumerable_0').select('tipo de serviço')
    // Click outside to focusout select
    cy.get('#request_fields').click()
    // Warning visible
    cy.get('[key="request_fields_enumerable_0"] .selectItem__message')
      .contains('Esse campo é obrigatório')
      .should('be.visible')


    cy.get('#request_fields_enumerable_3').select('Indique o prazo do serviço')
    cy.get('#request_fields').click()
    cy.get('[key="request_fields_enumerable_3"] .selectItem__message')
      .contains('Esse campo é obrigatório')
      .should('be.visible')
  })

  it('should have its own tab indicator activated', function() {
    cy.visit('https://s3-sa-east-1.amazonaws.com/getninjas.wilfernandes.com.br/index.html')

    cy.get('[data-nav-request]').should('have.class', 'tabsList__item--active')
    cy.get('[data-nav-user]').should('not.have.class', 'tabsList__item--active')
  })

  it('should submit a form and became invisible when all required fields are properly filled', function() {
    cy.visit('https://s3-sa-east-1.amazonaws.com/getninjas.wilfernandes.com.br/index.html')

    cy.get('#request_fields_enumerable_0').select('Corte')
    cy.get('#request_fields_enumerable_3').select('Nos próximos 30 dias')
    cy.get('#request_fields form').submit()

    cy.get('#request_fields').should('not.be.visible')
  })
})