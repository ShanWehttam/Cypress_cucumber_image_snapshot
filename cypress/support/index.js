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
import {username, password } from './utils'


// Cypress.Cookies.defaults({
//   whitelist: "standard_user"
// })

export function visit(url){
  cy.visit(url)
  cy.url().should( 'include', 'saucedemo')
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