Feature: Product Sorting

As a user
I want to be able to sort the products by price
So that I can quickly find a product that suits my budget

Background:
  Given I log in

  Scenario: Sort products by price
  When I sort the products by price
  Then I should see the products listed in ascending price order

  @potential_unit_test
  Scenario: Sort products by name
  When I sort the products by name
  Then I should not see the products listed in ascending price order