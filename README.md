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


## 🚀 Git Setup Commands (Pepperfry Automation Project)

### 🔹 Initialize Git Repository
```bash
git init
# Creates a new Git repository in your project folder
# Starts tracking your project with Git
```

### 🔹 Add Files to Staging Area
```bash
git add .
# Adds all files and folders to the staging area
# Prepares files for commit
```

### 🔹 Commit Changes
```bash
git commit -m "Initial commit - Pepperfry Automation Project"
# Saves the staged files as a snapshot
# "Initial commit" indicates the first version of the project
```

### 🔹 Connect to GitHub Repository
```bash
git remote add origin https://github.com/your-username/repo-name.git
# Links your local repository to a remote GitHub repository
# "origin" is the default name for the remote
```

### 🔹 Set Main Branch
```bash
git branch -M main
# Renames the current branch to "main"
# -M forces the rename if the branch already exists
```

### 🔹 Push Code to GitHub
```bash
git push -u origin main
# Uploads your code to GitHub repository
# Sets upstream so future pushes can be done with just "git push"
```

### ✅ Quick Summary
```
Initialize → Add → Commit → Connect → Set Branch → Push
```

## 🔄 Update Code to GitHub (After Modifications)

### 🔹 Check Changes (Optional but Recommended)
```bash
git status
# Shows which files are modified, added, or deleted
# Helps you understand what changes are pending
```

---

### 🔹 Add Updated Files to Staging
```bash
git add .
# Adds all modified/new files to staging area

# OR (specific file matrame add cheyali ante)
git add filename.ext
# Adds only a specific file
```

---

### 🔹 Commit Updated Changes
```bash
git commit -m "Updated functionality / bug fix / new changes"
# Saves the updated changes with a meaningful message
# Example: "Added login automation", "Fixed navigation issue"
```

---

### 🔹 Push Changes to GitHub
```bash
git push
# Uploads the latest committed changes to GitHub
# (No need to mention origin main again because already set with -u)
```

---

### ✅ Quick Update Flow
```
Check → Add → Commit → Push
```

---

### 💡 Example Workflow
```bash
git add .
git commit -m "Updated filters functionality in benches page"
git push
```


