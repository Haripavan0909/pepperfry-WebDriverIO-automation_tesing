import { Given, When, Then } from '@wdio/cucumber-framework';
import { furniturePage } from '../../pages/FurniturePage';

// ── Launch Website ─────────────────────────────
Given('I launch the browser and open Pepperfry website', async () => {
    await furniturePage.open();
    console.log('🌐 Pepperfry opened');
});

// ── Validate Title ─────────────────────────────
Then('I validate the page title contains {string}', async (expectedText: string) => {
    await furniturePage.validateTitle(expectedText);
});

// ── Navigate ───────────────────────────────────
When('I navigate to Furniture and select Settees and Benches', async () => {
    await furniturePage.navigateToSetteesAndBenches();
});

// ── Count Categories ───────────────────────────
Then('I display and log the count of {string}', async (categoryName: string) => {
    const count = await furniturePage.getCategoryCount(categoryName);
    console.log(`=============================`);
    console.log(`  ${categoryName} Count = ${count}`);
    console.log(`=============================`);
});

// ── FILTER STEPS ───────────────────────────────

// Filter By → Materials
When('I click on Filter By and select Materials', async () => {
    await furniturePage.openMaterialFilter();
});

// Select Metal
When('I select the filter option Metal', async () => {
    await furniturePage.selectMetalFilter();
    await furniturePage.clickApplyFilter();
});

// Display filtered results
Then('I display the filtered bench results', async () => {
    await furniturePage.scrollAndCaptureResults();
});

// Screenshot
Then('I take a screenshot of the results', async () => {
    await furniturePage.takeScreenshot('metal_benches');
});

// Log filtered count
Then('I log the total count of filtered benches in console', async () => {
    const count = await furniturePage.getFilteredResultsCount();
    console.log(`=============================`);
    console.log(`  Metal Benches Count = ${count}`);
    console.log(`=============================`);
});