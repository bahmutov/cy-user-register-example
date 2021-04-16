/// <reference types="cypress" />

// use a common variable to store the random user
let testUser

before(() => {
  cy.fixture('data.json').then(({ users }) => {
    // the index k will be from 0 to users.length - 1
    const k = Cypress._.random(users.length - 1)
    expect(k, 'random user index').to.be.within(0, users.length - 1)
    testUser = users[k]
  })
})

beforeEach(() => {
  cy.wrap(testUser).as('testUser')

  // we need to send the entire database object
  cy.request('POST', '/reset', {
    users: [testUser],
  })
})

it('sets the random user from the fixture list', function () {
  cy.visit('/')
  const name = testUser.name
  cy.contains('#user', `${name.first} ${name.last}`)
})

it('has the test user', function () {
  expect(this.testUser).to.be.an('object')
})
