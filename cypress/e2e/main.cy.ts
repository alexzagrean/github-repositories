describe('Main flow', () => {
  it('test navigation to repo and going back to home page', () => {
    cy.visit('http://localhost:3000/')

    cy.get('.MuiInputBase-input').type('alexzagrean');

    cy.getByData("search-input-option-0").click()

    cy.url().should('include', '/results?username=alexzagrean')

    cy.get('.back-button').click();

    cy.url().should('eq', 'http://localhost:3000/')
  })
})