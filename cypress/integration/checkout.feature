Feature: Checkout purchase

As a user
I want to be able to purchase the contents of my shopping basket
So that I can enjoy the products

Background:
  Given I log in
  And I add more than one product to the basket

  Scenario: purchasing products
  When I go to checkout
  Then i should end up on the checkout page
