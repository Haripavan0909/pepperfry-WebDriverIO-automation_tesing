// WDIO v9: hooks come from '@wdio/cucumber-framework'
import { Before, After, BeforeAll } from '@wdio/cucumber-framework';
import { browser } from '@wdio/globals';
import * as fs from 'fs';

// ── Runs ONCE before all scenarios ────────────────────────────
BeforeAll(async () => {
    if (!fs.existsSync('./screenshots')) {
        fs.mkdirSync('./screenshots', { recursive: true });
        console.log('📁 Created screenshots directory');
    }
});

// ── Runs before EACH scenario ─────────────────────────────────
Before(async () => {
    await browser.maximizeWindow();
    console.log('\n🚀 Starting scenario...');
});

// ── Runs after EACH scenario ──────────────────────────────────
// 'world' contains info about whether the scenario passed or failed
After(async (world) => {
    // world.result.status is 'FAILED' if the scenario failed
    if (world.result?.status === 'FAILED') {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const name = world.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
        const path = `./screenshots/FAILED_${name}_${timestamp}.png`;
        await browser.saveScreenshot(path);
        console.log(`\n❌ Scenario failed. Screenshot: ${path}`);
    }
    await browser.deleteCookies([]);
});