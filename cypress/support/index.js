/// <reference types="cypress" />

// local variable to remember the once generated user
let testUser

Cypress.Commands.add('pickTestUser', () => {
  if (testUser) {
    return cy.wrap(testUser)
  }

  cy.fixture('data.json').then(({ users }) => {
    // the index k will be from 0 to users.length - 1
    const k = Cypress._.random(users.length - 1)
    expect(k, 'random user index').to.be.within(0, users.length - 1)
    testUser = users[k]
    // yield the generated test user object
    cy.wrap(testUser)
  })
})
