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
import {username, password, item_prices } from './utils'

// Cypress.Cookies.defaults({
//   whitelist: "standard_user"
// })

export function visit(url){
  cy.visit(url)
  cy.url().should( 'include', 'saucedemo')
}

const getItemPrices = () => cy.get(item_prices).then(removeDollarSign)
const removeDollarSign = (prices) => prices.text().split("$").filter(Boolean)

export function addMultipleItems({numberOfItems=2, value="cheapest"}){
  console.log(numberOfItems)
  getItemPrices().then( prices => {
    value === 'cheapest' && addcheapestItems(prices, numberOfItems) ||
    value === 'expensive' && addexpensiveItems(prices, numberOfItems)
  })
}

export let products = []
export function addcheapestItems(prices, numberOfItems = 1){
  console.log(numberOfItems)
    let product_count = 0
    while (product_count < numberOfItems) {
      product_count += 1
      let cheapest = Math.min(...prices)
      products.push(cheapest)
      prices = prices.filter(arg => arg !== cheapest.toString())
      cy.contains(cheapest).next().click()
  }
}

export function logIn({username='standard_user', password='secret_sauce'}){
  cy.getByDataAttr('username').type(username)
  cy.getByDataAttr('password').type(password)
  cy.contains('input','LOGIN').click()
}

export const ascending = (a,b) => a - b

export function resetState(){
  cy.get('.bm-burger-button').click()
  cy.contains('Reset App State').click()
  cy.contains('All Items').click()
}

export function resetter(){
  console.log("RESETTING STATE")
  cy.wait(50000000000000)
  cy.get('.bm-burger-button').click()
  cy.contains('Reset App State').click()
  console.log('mattty')
  cy.contains('All Items').click()
  console.log("FIISHED RESETTING STATE")
}

// Cypress can't do any Cypress commands on failure
Cypress.on('fail', (error, runnable) => {
  // debugger
  console.log('mattty')
  cy.wait(50000000000000)
  console.log('mattty')
  return resetter()
  console.log('mattty')
  throw {message: `${error}   STATE HAS BEEN RESET`} // throw error to have test still fail

})