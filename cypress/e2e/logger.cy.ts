describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/logger');
    cy.get('h1').contains('Logger')
    cy.get('table tr').should('have.length.be.gt', 1);
  })
})

export {}