describe('create', () => {
    it('Preenche formulario', () => {
        cy.visit("./index.html");
        cy.get('#botao-add').click();
        cy.get("#inpNome").type("novo nome");
        cy.get("#inpTel").type("3732427007");
        cy.get("#inpCEP").type("35681097");
        cy.wait(2000);
        cy.get("#inpNumero").type("219");
        cy.get('#btnSub').click();

    })
});