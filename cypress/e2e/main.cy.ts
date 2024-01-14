describe('Main flow', () => {
  it('clicking "type" navigates to a new url', () => {
    cy.visit('http://localhost:3000/')

    cy.get('.search-input').type('alexzagrean{enter}');

    cy.url().should('include', '/results?username=alexzagrean')

    cy.get('.back-button').click();

    cy.url().should('eq', 'http://localhost:3000/')
  })
})