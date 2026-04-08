Feature: Pepperfry Furniture End-to-End Flow

  Scenario: Validate counts and filter Metal benches

    Given I launch the browser and open Pepperfry website
    Then I validate the page title contains "Pepperfry"

    When I navigate to Furniture and select Settees and Benches

    Then I display and log the count of "Benches"
    And I display and log the count of "Settees"
    And I display and log the count of "Recamiers"

    When I click on Filter By and select Materials
    And I select the filter option Metal

    Then I display the filtered bench results
    And I take a screenshot of the results
    And I log the total count of filtered benches in console