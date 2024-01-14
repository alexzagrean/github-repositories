describe('Results testing', () => {
    it('test elements existence', () => {
        cy.visit('http://localhost:3000/results?username=alexzagrean')

        cy.getByData("see-github-page-link").invoke('attr', 'href').should('include', 'github.com');

        cy.getByData("github-user-name").should('include.text', 'alexzagrean');

        cy.getByData("repository-list-item-0").should('exist').invoke('attr', 'href').should('include', 'github.com')
    })

    it('test load more functionality', () => {
        cy.visit('http://localhost:3000/results?username=facebook')

        cy.getByData("repository-list-item-10").should('not.exist')

        cy.getByData("load-more-button").click();

        cy.getByData("repository-list-item-10").should('exist')
    })
})