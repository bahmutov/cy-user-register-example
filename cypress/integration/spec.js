/// <reference types="cypress" />

before(() => {
  cy.fixture('data.json').then(({ users }) => {
    // the index k will be from 0 to users.length - 1
    const k = Cypress._.random(users.length - 1)
    expect(k, 'random user index').to.be.within(0, users.length - 1)
    Cypress.config('testUser', users[k])
  })
})

beforeEach(() => {
  const testUser = Cypress.config('testUser')
  // we need to send the entire database object
  cy.request('POST', '/reset', {
    users: [testUser],
  })
})

it('sets the random user from the fixture list', () => {
  const testUser = Cypress.config('testUser')
  cy.visit('/')
  const name = testUser.name
  cy.contains('#user', `${name.first} ${name.last}`)
})

it('has the test user', () => {
  const testUser = Cypress.config('testUser')
  expect(testUser).to.be.an('object')
})
