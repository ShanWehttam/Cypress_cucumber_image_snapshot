import { logIn, visit } from '../index.js'

Given('I log in', () => {
  cy.log("JONES")
  cy.location("pathname")
  cy.getCookies()
  visit("/")
  logIn()
});

// *******************  OLD WAY **********************
// When('I add more than one product to the basket', () => { 
//   getItemPrices()
//   .then(removeDollarSign)
//   .then( prices => cheapestItems(prices, 2))
// });

When('I add more than one product to the basket', () => {
  cy.addMultipleItems()
  /* THE BELOW TECHNIQUE ISN"T READABLE AND SEEMS OVERKILL
       getItemPrices is something that can be done in the background
  cy.getItemPrices().then( prices => {  getItemPrices has nothing to do with the test
    cy.addMultipleItems(prices)
  })
  */
});

When('I view my basket after adding more than one product', () => {
  cy.addMultipleItems()
  cy.get('#shopping_cart_container').click()
});

When('I sort the products by name', () => {
  // cy.get('select').select('az')
});

When('I remove the cheapest item', () => {
  // cy.get('select').select('az').as('jim')
  // cy.get('@jim')
  cy.removeCheapestItem()
});

Then('I should see that the items have been added to the basket', () => {
  cy.checkBasketContents("items added")
});

Then('I should no longer see the item in my basket', () => {
  cy.checkBasketContents("one removed")
});