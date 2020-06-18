// export const username = "[data-test='username']"
// export const password = "[data-test='password']"

// export const username = (user) => `[data-test=${user}]`
// export const password = (pass) => `[data-test=${pass}]`

export function resetState(){
  cy.get('.bm-burger-button').click()
  cy.contains('Reset App State').click()
  cy.contains('All Items').click()
  cy.log("RESET COMPLETE")
}

export const ascending = (a,b) => a - b

export function getItemPrices(){
  Cypress.log({
    displayName: "getItemPrices",
    message: [`getting item prices `]
    // autoEnd: false,
  });
  return cy
  .document()
  .then( doc => [...doc.querySelectorAll('.inventory_item_price')]
  .map( price => price.textContent )
  .map( price => price.replace("$", "") ) 
  .map( price => parseFloat(price) )
  )
}

function waitForElement(selector){
  const timeout = 5
  let timer = 0
  do {
    cy.get(selector)
    cy.wait(0.1)
    timer += 0.1
  } while (timeout > timer )
}

// const removeDollarSign = (prices) => prices.text().split("$").filter(Boolean)
// const priceNumbers = (prices) => prices.map( (price, ind) => { console.log(price) ; return parseFloat(price) })

// function getItemPrices(){
//   console.log('called')
//   return cy
//   .get('.inventory_item_price')
//   .then( removeDollarSign )
//   .then( priceNumbers )
// }