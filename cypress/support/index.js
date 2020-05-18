// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Cypress.Cookies.defaults({
//   whitelist: "standard_user"
// })

export function visit(url){
  cy.visit(url)
  cy.url().should( 'include', 'saucedemo')
}

export let products = []
export function cheapestItems(amount){
  cy.get('.inventory_item_price').then(prices => {
    prices = prices.text().split("$").filter(Boolean)
    let product_count = 0
    while (product_count < amount) {
      product_count += 1
      let cheapest = Math.min(...prices)
      products.push(cheapest)
      prices = prices.filter(arg => arg !== cheapest.toString())
      cy.contains(cheapest).next().click()
    }
  })
}

export function logIn(credentials = {}){
  cy.get("[data-test='username']").type(credentials["username"])
  cy.get("[data-test='password']").type(credentials["password"])
  cy.contains('input','LOGIN').click()  
}

export const ascending = (a,b) => a - b

export function resetState(){
  cy.get('.bm-burger-button').click()
  cy.contains('Reset App State').click()
  cy.contains('All Items').click()
}
