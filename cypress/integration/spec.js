/// <reference types="cypress" />

beforeEach(() => {
  cy.pickTestUser().then((testUser) => {
    // we need to send the entire database object
    cy.request('POST', '/reset', {
      users: [testUser],
    })
  })
})

it('sets the random user from the fixture list', () => {
  cy.pickTestUser().then((testUser) => {
    cy.visit('/')
    const name = testUser.name
    cy.contains('#user', `${name.first} ${name.last}`)
  })
})

it('has the test user', () => {
  // use .should assertion on the yielded object
  cy.pickTestUser().should('be.an', 'object')
})
