/// <reference types="cypress" />

before(() => {
  cy.fixture('data.json').then(({ users }) => {
    // the index k will be from 0 to users.length - 1
    const k = Cypress._.random(users.length - 1)
    expect(k, 'random user index').to.be.within(0, users.length - 1)
    Cypress.env('testUser', users[k])
  })
})

beforeEach(() => {
  const testUser = Cypress.env('testUser')
  // we need to send the entire database object
  cy.request('POST', '/reset', {
    users: [testUser],
  })
})

it('sets the random user from the fixture list', () => {
  const testUser = Cypress.env('testUser')
  cy.visit('/')
  const name = testUser.name
  cy.contains('#user', `${name.first} ${name.last}`)
})

it('has the test user', () => {
  const testUser = Cypress.env('testUser')
  expect(testUser).to.be.an('object')
})
