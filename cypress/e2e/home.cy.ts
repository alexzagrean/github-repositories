describe('Home testing', () => {
  it('test elements existence', () => {
    cy.visit('http://localhost:3000/')

    cy.get('.MuiInputBase-input').type('alex');

    cy.get('.search-option').should('have.length.above', 5)
  })

  it('test navigation to repo', () => {
    cy.visit('http://localhost:3000/')

    cy.get('.MuiInputBase-input').type('alexzagrean');

    cy.getByData("search-input-option-0").click()

    cy.url().should('include', '/results?username=alexzagrean')
  })
})