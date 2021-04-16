/// <reference types="cypress" />

import { users } from '../fixtures/data.json'

// note that Cypress._ is available outside of any test.
// the index k will be from 0 to users.length - 1
const k = Cypress._.random(users.length - 1)
expect(k, 'random user index').to.be.within(0, users.length - 1)
const testUser = users[k]

Cypress.Commands.add('pickTestUser', () => {
  cy.wrap(testUser)
})
