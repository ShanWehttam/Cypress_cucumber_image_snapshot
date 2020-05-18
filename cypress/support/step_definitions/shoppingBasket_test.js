import { logIn, visit, ascending, cheapestItems, products, resetState } from '../index.js'

Given('I log in', () => {
  cy.getCookies()
  visit("/")
  logIn({username: 'standard_user', password: 'secret_sauce'})
});

When('I add more than one product to the basket', () => {
  cheapestItems(2)
  cy.log(products)
});

When('I view my basket after adding more than one product', () => {
  cheapestItems(2)
  cy.get('#shopping_cart_container').click()
});

When('I sort the products by name', () => {
  cy.get('select').select('az')
});

let cheapest;
When('I remove the cheapest item', () => {
  cy.document().then( doc => {
    let prices = 
    [...doc.querySelectorAll('.inventory_item_price')]
    .map( price => price.textContent)
    cheapest = Math.min(...prices)
    cy.contains(cheapest).next().click()
  })
});

Then('I should see that the items have been added to the basket', () => {
  cy.log(products)
  cy.get('#shopping_cart_container').click()
  cy.document().then( doc => {
    let prices = [...doc.querySelectorAll('.inventory_item_price')].map(arg => arg.textContent)
    cy.wrap(prices).should('have.members', ["7.99", "9.99"])
  })
  resetState()
});

Then('I should no longer see the item in my basket', () => {
  cy.document().then( doc => {
    let prices = 
    [...doc.querySelectorAll('.inventory_item_price')]
    .map( price => price.textContent)
    expect(prices).not.to.include(cheapest)
  })
  resetState()
});