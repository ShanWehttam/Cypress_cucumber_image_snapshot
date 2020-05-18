Feature: Log In

As a user
I want to be able to login
So that I can view Swaglabs' products

  Scenario: Successful Log in
  Given I am on the "Swaglabs" login page
  When I enter my correct login credentials
  Then I should be on the product listing page

  Scenario: Wrong Username provided
  Given I am on the "Swaglabs" login page
  When I enter my correct password
  But I enter an incorrect username
  Then I should see an error

  Scenario: Wrong Password provided
  Given I am on the "Swaglabs" login page
  When I enter my correct username
  But I enter an incorrect password
  Then I should see an error