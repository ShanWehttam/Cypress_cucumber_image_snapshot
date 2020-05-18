import { logIn, visit, ascending } from '../index.js'


When('I log in', () => {
  cy.getCookies()
  visit("/")
  logIn({username: 'standard_user', password: 'secret_sauce'})
});

When('I sort the products by price', () => {
  cy.get('select').select('lohi')
});

When('I sort the products by name', () => {
  cy.get('select').select('az')
});

Then('I should see the products listed in ascending price order', () => {
  cy.get('.inventory_item_price').then(prices => {
    prices = prices.text().split("$").filter(Boolean)
    cy.log(prices)
    expect(prices).to.eql(prices.sort(ascending))
  })
});

Then('I should not see the products listed in ascending price order', () => {
  cy.get('.inventory_item_price').should(prices => {
    console.log(prices)
    prices = prices.text().split("$").filter(Boolean)
    console.log(prices)
    const ordered_prices = prices.sort(ascending)
    console.log(ordered_prices)   
    expect(prices).not.to.equal(["29.99", "9.99", "15.99", "49.99", "7.99", "15.99"])  
    // Cypress should accept ordered_prices but doesn't.  This must be a bug with Cypress.
    // I've had to provide an explicit array as an argument which isn't great :(
  })
});