import { addMultipleItems, logIn, visit, products, resetState } from '../index.js'

Given('I log in', () => {
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
  addMultipleItems({})
});

When('I view my basket after adding more than one product', () => {
  addMultipleItems({})
  cy.get('#shopping_cart_container').click()
});

When('I sort the products by name', () => {
  cy.get('select').select('az')
});

function removeCheapestItem(){
  cy.document().then( doc => {
    let prices = [...doc.querySelectorAll('.inventory_item_price')].map( price => price.textContent)
    console.log(prices)
    let cheapest = Math.min(...prices)
    console.log('bertha', cheapest)
    cy.contains(cheapest).next().click()
  })
}

When('I remove the cheapest item', () => {
  // cy.get('select').select('az').as('jim')
  // cy.get('@jim')
  removeCheapestItem()
});

Then('I should see that the items have been added to the basket', () => {
  cy.log(products)
  cy.get('#shopping_cart_container').click()
  cy.document().then( doc => {
    let prices = [...doc.querySelectorAll('.inventory_item_price')].map(arg => parseFloat(arg.textContent))
    resetState()
    // cy.wrap(prices).should('have.members', products)
    console.log(products)
    expect(prices).to.eql(products)
  })
});

Then('I should no longer see the item in my basket', () => {
  cy.document().then( doc => {
    let prices = 
    [...doc.querySelectorAll('.inventory_item_price')]
    .map( price => price.textContent)
    let cheapest = Math.min(...prices)
    resetState()
    expect(prices).not.to.include(cheapest)
  })
});