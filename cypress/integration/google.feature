Feature: Google

  Scenario: Google Search
    Given I am on the Google homepage
    When I search for "nick dunn"
    Then I see some results
