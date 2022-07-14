const APP_URL = process.env.VUE_APP_URL || 'http://localhost:8080'

describe('Home', () => {
  it('should render list user in component UserTable', () => {
    cy.visit(APP_URL)

    cy.get('#user-table')
  })
})
