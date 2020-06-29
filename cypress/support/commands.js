// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })



import {resetState, 
        ascending, 
        getItemPrices } from './utils'

Cypress.Commands.add('getByDataAttr', (QAattrValue) => {
   cy.get(`[data-test=${QAattrValue}]`)
})

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
addMatchImageSnapshotCommand({
  failureThreshold: 0.00,
  failureThresholdType: 'percent',
  customDiffConfig: { threshold: 0.0 },
  capture: 'viewport',
});

Cypress.Commands.add("setResolution", (size) => {
  if (Cypress._.isArray(size)) {
     cy.viewport(size[0], size[1]);
   } else {
    cy.viewport(size);
  }
 })

Cypress.Commands.add('users', () => {
  const credentials = {
    username: 'standard_user', 
    password: 'secret_sauce'
  }
  return credentials
})

let outside;
Cypress.Commands.add('logIn', (credentials) => {
  console.log("I am", outside)
  console.log(credentials.username)
  const signinPath = "/";
  const log = Cypress.log({
    name: "login",
    displayName: "LOGIN",
    message: [`🔐 Authenticating | ${credentials.username}`],
    // autoEnd: false,
  });
  cy.server();
  cy.route("**/inventory.html").as("signup");
  cy.location("pathname", { log: false }).then((currentPath) => {
    cy.log("paaattatatata", currentPath)
    if (currentPath === "/cart.html"){
      resetState()
    } else if (currentPath !== signinPath) {
      cy.visit(signinPath, { log: false });
      log.snapshot('before')
    }
  });
  cy.visit(signinPath)
  cy.getByDataAttr('username').type(credentials.username)
  cy.getByDataAttr('password').type(credentials.password)
  cy.contains('input','LOGIN').click()
  resetState()
  log.snapshot('after')
})

const productListing = {
  "ascending order": function(log){
    getItemPrices()
    .then(prices => expect(prices).to.eql(prices.sort(ascending)) )
  },
  "random order"(log) {
    getItemPrices().then( prices => {
    const ordered_prices = [...prices.sort(ascending)]
    expect(prices).not.to.equal(ordered_prices) 
    });
  }
}

Cypress.Commands.add('listingOrder', (order_type) => {
  const log = Cypress.log({
    name: "listing order",
    displayName: "LIST ORDER",
    message: [`🔐 listing products in | ${order_type}`],
    // autoEnd: false,
  });
  return productListing[order_type](log)
})


// const getItemPrices = () => cy.get('.inventory_item_price').then( prices => { return prices.text() })

// Cypress.Commands.add('getItemPrices', () => {
//   const log = Cypress.log({
//     name: "Get Item Prices",
//     displayName: "Get Item Prices",
//     message: [`🔐 getting prices `]
//     // autoEnd: false,
//   })
//   cy
//   .get('.inventory_item_price')
//   .then(removeDollarSign)
//   .then(priceNumbers)
//   .then( prices => {
//     log.set( { 
//       consoleProps() { return { prices: prices } } 
//     }) 
//     return prices
//   })    
// });

let products = []
const addItems = {
  "cheapest"(prices, numberOfItems) {
    cy.pause()
    console.log(prices, numberOfItems)
    let product_count = 0
    while (product_count < numberOfItems) {
      product_count += 1
      let cheapest = Math.min(...prices)
      console.log("cheapest", cheapest)
      products.push(cheapest)
      prices = prices.filter(arg => arg !== cheapest)
      console.log(prices)
      cy.contains(cheapest).next().click()
    }
  }
}

Cypress.Commands.add('addMultipleItems', (numberOfItems=2, value="cheapest") => {
  const log = Cypress.log({
    name: "adding multiple items",
    displayName: "Adding multiple items",
    message: [`🔐 adding ${numberOfItems} of the ${value} items to the basket | `],
    // autoEnd: false,
  });
  getItemPrices().then( prices => {
    cy.log("PRICES", prices)
    addItems["cheapest"](prices, numberOfItems)
  })
})

// export function resetter(){
//   console.log("RESETTING STATE")
//   cy.wait(50000000000000)
//   cy.get('.bm-burger-button').click()
//   cy.contains('Reset App State').click()
//   console.log('mattty')
//   cy.contains('All Items').click()
//   console.log("FIISHED RESETTING STATE")
// }

const basketContents = {
  "one removed"() {
    cy.get('#shopping_cart_container').click()    
    getItemPrices()
    .then( prices => expect(prices).not.to.include( Math.min(...prices) ) )
    .then( _ => products.splice(0, products.length))
  },
   "items added"() {
    cy.log("PRODUCTS", products)
    cy.get('#shopping_cart_container').click()
    getItemPrices()
    .then( prices => {console.log("prreeeeeces", prices) ; expect(prices).to.eql(products) })
    .then( _ => products.splice(0, products.length))
  }
}
// cy.wrap(prices).should('have.members', products)

Cypress.Commands.add('checkBasketContents', (basket = 'empty') => {
  console.log('rfrfrrfrf', basket)
  const log = Cypress.log({
    name: "checking contents of basket",
    displayName: "Check Basket",
    message: [`🔐 checking that the correct items are been added to the basket | `],
    // autoEnd: false,
  });
  basketContents[basket]()
})

let cheapest;
Cypress.Commands.add('removeCheapestItem', () => {
    getItemPrices().then( prices => {
      let cheapest = Math.min(...prices)
      console.log('bertha', cheapest)
      cy.contains(cheapest).next().click()
  }).then( arg => {return cheapest})
})