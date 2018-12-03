/* global Given */
// you can have external state, and also require things!
const url = 'https://google.com'

Given('I am on the Google homepage', () => {
  cy.visit(url)
})

When('I search for {string}', (q) => {
  cy.get('input[name="q"]').type(q).parents('form').submit();
});

Then('I see some results', () => {
  cy.get('.g').should('exist')
});
