// const url = 'https://www.saucedemo.com/'


function visit(url){
  cy.visit(url)
  cy.url().should( 'include', 'saucedemo')
}

Given('I am on the "Swaglabs" login page', (page) => {
  cy.visit("/")  //Base url is stored in cypress.json file :)
  cy.url().should( 'include', 'saucedemo')
  // cy.url().invoke('split', "www.").should( domain => {
  //   expect(domain.pop()).to.eql('saucedemo.com/')
  // })
})

When('I enter my correct login credentials', () => {
  cy.get("[data-test='username']").type('standard_user')
  cy.get("[data-test='password']").type('secret_sauce')
  cy.contains('input','LOGIN').click()
});

When('I enter my correct password', () => {
  cy.get("[data-test='password']").type('secret_sauce')
  cy.contains('input','LOGIN').click()
});

When('I enter an incorrect username', () => {
  cy.get("[data-test='password']").type('matt_user')
  cy.contains('input','LOGIN').click()
});

When('I enter my correct username', () => {
  cy.get("[data-test='password']").type('standard_user')
  cy.contains('input','LOGIN').click()
});

When('I enter an incorrect password', () => {
  cy.get("[data-test='password']").type('matts_sauce')
  cy.contains('input','LOGIN').click()
});


Then('I should see an error', () => {
  cy.get("[data-test='error']")
});

Then('I should be on the product listing page', () => {
  cy.contains('div', 'Products')
});