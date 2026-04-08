# Pepperfry Furniture Automation Suite

An automated testing suite for the Pepperfry website, focused on validating furniture search functionality, category bench counts, and search filters. This project is built using **WebDriverIO**, **Cucumber (BDD)**, and **TypeScript**.

## 📁 Project Structure

The framework is organized as follows:

```text
pepperfry-automation/
│
├── features/
│   ├── furniture.feature              # Cucumber BDD scenarios
│   └── step_definitions/
│       └── furnitureSteps.ts          # Step definitions mapping to feature files
│
├── pages/
│   └── FurniturePage.ts               # Page Object Model for the Furniture page
│
├── support/
│   └── hooks.ts                       # WebDriverIO / Cucumber hooks
│
├── screenshots/                       # Auto-generated directory for test screenshots
├── node_modules/                      # Auto-created dependencies directory
│
├── wdio.conf.ts                       # WebDriverIO configuration file
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Project dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
Clone the repository and install the required dependencies:

```bash
npm install
```

### Execution
To run the automated Cucumber scenarios, use the following command:

```bash
npm run wdio
```


## 🧪 Test Scenarios

The tests are written in plain English using Gherkin syntax.

```gherkin
Feature: Pepperfry Furniture Search and Bench Validation
  As a QA engineer
  I want to automate the furniture search on Pepperfry
  So that I can validate bench categories and filter results

  Background:
    Given I launch the browser and open Pepperfry website
    Then I validate the page title contains "Online Furniture Shopping Store"

  Scenario: Display furniture categories and validate bench counts
    When I navigate to "Furniture" and select "Settees & Benches"
    Then I should see the list of furniture types displayed
    And I display and log the count of "Benches"
    And I display and log the count of "Settees"
    And I display and log the count of "Recamiers"

  Scenario: Filter benches by Metal material and take screenshot
    When I navigate to "Furniture" and select "Settees & Benches"
    And I click on "Filter By" and select "Materials"
    And I select the filter option "Metal"
    Then I display the filtered bench results
    And I take a screenshot of the results
    And I log the total count of filtered benches in console
```
