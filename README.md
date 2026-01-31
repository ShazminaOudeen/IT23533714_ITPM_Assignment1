# Playwright -ITPM Assignment 1 – IT23533714

## Project Overview
This project contains automated UI test cases implemented using **Playwright** to test the behavior, accuracy, and usability of an online Singlish translator web application.

---

## Technology Stack
- Playwright
- Node.js
- JavaScript
- Playwright Test Runner

---

## Project Structure

```
IT23533714/
 ├── tests/
 │   ├── IT23533714_pos_fun_tests.spec.js
 │   ├── IT23533714_neg_fun_tests.spec.js
 │   └── IT23533714_pos_UI_test.spec.js
 │
 ├── playwright.config.js
 ├── package.json
 ├── package-lock.json
 ├── test-results/
 ├── playwright-report/
 └── README.md
```

---

## Prerequisites

To run this project make sure the following are installed:

- Node.js 
- npm
- Git

Check versions:

```
node -v
npm -v
git --version
```

---

## Installation Steps

### 1️.Clone the Repository

```
git clone https://github.com/ShazminaOudeen/IT23533714_ITPM_Assignment1.git
cd IT23533714
```

---

### 2️.Install Dependencies

```
npm install
```

This installs Playwright and all required packages listed in package.json.

---

### 3️.Install Playwright Browsers

```
npx playwright install
```

This downloads Chromium, Firefox, and WebKit browsers required for testing.

---

## Running the Tests

### Run All Tests

```
npx playwright test
```

---

### Run Tests in Headed Mode (Visible Browser)

```
npx playwright test --headed
```

---

### Run a Specific Test File

```
npx playwright test tests/IT23533714_pos_fun_tests.spec.js
```

```
npx playwright test tests/IT23533714_neg_fun_tests.spec.js
```

```
npx playwright test tests/IT23533714_pos_UI_test.spec.js
```

---

## 📊 Viewing Test Reports

After test execution, open the HTML report:

```
npx playwright show-report
```

This opens a detailed Playwright test report in your browser.

---

## 🔁 Test Execution Flow

Each automated test performs the following steps:

1. Opens the singlish/sinhala translator web application
2. Enters Singlish/Thanglish input text
3. Observe automatic translated output
4. Captures actual output
5. Compares with the expected output
6. Marks test result as pass/fail

---

## Test Coverage

The automated tests cover:

- Simple, compound, and complex sentences
- Questions and commands
- Positive and negative sentence forms
- Daily language usage
- Slang and informal inputs
- Mixed English + Singlish/Thanglish inputs
- Punctuation and numeric formats
- Short, medium, and long inputs
- UI clear inputs handling behavior

---

## Author

- Registration Number: IT23533714  
- Name: G.S Oudeen
- Batch: IT.WD.1.1
- Module: IT3040 – ITPM  
- Assignment: Playwright Automation Testing (Assignment 1)

