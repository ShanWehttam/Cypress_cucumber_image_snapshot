Feature: Adding and Removing Items from the shopping basket

As a user
I want to be able to change the contents of my shopping basket
So that I can purchase the items that i want

Background:
  Given I log in
  And I sort the products by price

  Scenario: Adding multiple products to the basket
  When I add more than one product to the basket
  Then I should see that the items have been added to the basket

  Scenario: Removing an item from the basket
  And I view my basket after adding more than one product
  When I remove the cheapest item
  Then I should no longer see the item in my basket