describe('delete', () => {
    it('Deletar primeiro contato', () => {
        cy.visit("./index.html");
        cy.wait(1000);
        cy.get('.btnDelete').first().click();
        cy.wait(1000);
        cy.get(".md-button-content:contains('Excluir')").click();
    })
});