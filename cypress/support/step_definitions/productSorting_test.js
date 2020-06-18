import {visit} from '../index.js'


When('I log in', () => {
  cy.log("JONES")

  cy.getCookies()
  cy.users().then( credentials => {
    cy.logIn(credentials)
  })
});

When('I sort the products by price', () => {
  cy.get('select').select('lohi')
});

When('I sort the products by name', () => {
  cy.get('select').select('az')
  // cy.matchImageSnapshot()
});

Then('I should see the products listed in ascending price order', () => {
  cy.listingOrder('ascending order')
});

Then('I should not see the products listed in ascending price order', () => {
  cy.listingOrder('random order')
 })
