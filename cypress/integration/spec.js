/// <reference types="cypress" />

it('loads the first user', () => {
  cy.visit('/')
  cy.contains('#user', 'Joe Smith')
})
