describe('First test', function() {
  it('Searches Google', function() {
    cy.visit('https://google.com');
    cy.get('input[name="q"]').type("nick dunn").parents('form').submit();
    cy.get('.g').should('exist')
  })
})
