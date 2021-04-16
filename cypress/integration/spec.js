/// <reference types="cypress" />

it('sets the random user from the fixture list', () => {
  cy.fixture('data.json').then(({ users }) => {
    // the index k will be from 0 to users.length - 1
    const k = Cypress._.random(users.length - 1)
    expect(k, 'random user index').to.be.within(0, users.length - 1)
    const testUser = users[k]

    // we need to send the entire database object
    cy.request('POST', '/reset', {
      users: [testUser],
    })
    cy.visit('/')
    cy.contains('#user', `${testUser.name.first} ${testUser.name.last}`)
  })
})
