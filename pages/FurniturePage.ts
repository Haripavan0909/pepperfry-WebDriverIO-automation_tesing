import { browser, $, $$ } from '@wdio/globals';
import allure from '@wdio/allure-reporter';

export class FurniturePage {

    // ── Selectors ─────────────────────────────────────────────

    // Furniture menu
    get furnitureMenu() {
        return $('//*[@id="Furniture"]/a');
    }

    // Settees & Benches submenu
    get setteesAndBenches() {
        return $('//*[@id="meta-Furniture"]/div/div/div/div/div[2]/ul[3]/li[1]/a');
    }

    // Popup close button (multiple fallbacks)
    get popupCloseButtons() {
        return [
            '//*[@id="desktop-header-login"]/div/div[1]/div/a',
            'button[aria-label="Close"]',
            '.iconCross',
            '.close'
        ];
    }

    async autoHandlePopup(): Promise<void> {
        try {
            const popupSelectors = this.popupCloseButtons;

            for (const selector of popupSelectors) {
                const elements = await $$(selector);

                for (const el of elements) {
                    if (await el.isDisplayed()) {
                        await browser.execute((e) => (e as HTMLElement).click(), el);
                        console.log(`✅ Popup closed using: ${selector}`);
                        return;
                    }
                }
            }

        } catch (error) {
            // ignore
        }
    }


    // ── Actions ───────────────────────────────────────────────

    // Open website
    async open(): Promise<void> {
        await browser.url('https://www.pepperfry.com/');

        await this.furnitureMenu.waitForDisplayed({
            timeout: 30000,
            timeoutMsg: 'Furniture menu not visible'
        });

        console.log('✅ Pepperfry opened');
        await browser.pause(3000);

        await this.closePopupIfPresent();
    }

    // Close popup
    async closePopupIfPresent(): Promise<void> {
        try {
            await browser.pause(2000);

            for (const selector of this.popupCloseButtons) {
                const el = await $(selector);

                if (await el.isExisting() && await el.isDisplayed()) {
                    await el.click();
                    console.log(`✅ Popup closed using: ${selector}`);
                    await browser.pause(1000);
                    return;
                }
            }

            console.log('ℹ️ No popup found');

        } catch (error) {
            console.log('⚠️ Popup handling skipped');
        }
    }

    // Validate title
    async validateTitle(expectedText: string): Promise<void> {
        const title = await browser.getTitle();
        console.log(`✅ Page Title: ${title}`);

        if (!title.includes(expectedText)) {
            throw new Error(`❌ Title mismatch: Expected "${expectedText}" but got "${title}"`);
        }
    }

    // Navigate to Settees & Benches
    async navigateToSetteesAndBenches(): Promise<void> {
        try {
            await this.furnitureMenu.waitForDisplayed({ timeout: 10000 });
            await this.furnitureMenu.moveTo();
            console.log('🖱️ Hovered on Furniture');

            await browser.pause(2000);

            await this.setteesAndBenches.waitForExist({ timeout: 10000 });

            await browser.execute(
                (el) => (el as HTMLElement).click(),
                await this.setteesAndBenches
            );

            console.log('✅ Clicked Settees & Benches');

            await browser.waitUntil(
                async () => {
                    const url = await browser.getUrl();
                    return url.includes('settees') || url.includes('benches');
                },
                { timeout: 15000 }
            );

            console.log('✅ Navigated to Settees & Benches page');

            await browser.pause(3000);

            await this.closePopupIfPresent();

        } catch (error) {
            console.error('❌ Navigation failed:', error);
            throw error;
        }
    }

    // Get category count
    async getCategoryCount(categoryName: string): Promise<number> {
        try {
            const optionsList = await $$('//div[contains(text(),"options")]');

            const indexMap: { [key: string]: number } = {
                'Settees': 1,
                'Benches': 2,
                'Recamiers': 3
            };

            const index = indexMap[categoryName];

            if (!optionsList[index]) {
                console.error(`❌ ${categoryName} not found`);
                return 0;
            }

            const text = await optionsList[index].getText();
            const count = parseInt(text.match(/(\d+)/)?.[1] || '0');

            console.log(`✅ ${categoryName} Count = ${count}`);

            return count;

        } catch (error) {
            console.error(`❌ Error in ${categoryName}:`, error.message);
            return 0;
        }
    }

    // ───────────────── FILTER FUNCTIONALITY ─────────────────

    // Open Filter → Materials
    async openMaterialFilter(): Promise<void> {
        try {
            const moreFilters = await $('//*[contains(text(),"More Filters")]');
            await moreFilters.waitForDisplayed({ timeout: 10000 });

            await moreFilters.scrollIntoView();
            await browser.pause(1000);

            await moreFilters.click();
            console.log('✅ Clicked More Filters');

            const material = await $('//*[contains(text(),"Material")]');
            await material.waitForDisplayed({ timeout: 10000 });

            await material.scrollIntoView();
            await browser.pause(1000);

            await material.click();
            console.log('✅ Opened Material');

        } catch (error: any) {
            console.error('❌ Error opening filters:', error.message);
            throw error;
        }
    }

    // Select Metal checkbox
    async selectMetalFilter(): Promise<void> {
        try {
            const metal = await $('//*[contains(text(),"Metal")]');

            await metal.waitForDisplayed({ timeout: 10000 });

            await metal.scrollIntoView();
            await browser.pause(500);

            await metal.click();

            console.log('✅ Selected Metal');

        } catch (error: any) {
            console.error('❌ Error selecting Metal:', error.message);
            throw error;
        }
    }

    // Click Apply button
    async clickApplyFilter(): Promise<void> {
        try {
            await this.autoHandlePopup();

            // 🔥 Same XPath as Selenium
            const applyBtn = await $('//span[normalize-space()="APPLY"]');

            await applyBtn.waitForExist({ timeout: 10000 });

            // Scroll into view
            await applyBtn.scrollIntoView();
            await browser.pause(500);

            // JS click (same like Selenium js.executeScript)
            await browser.execute((el) => {
                (el as HTMLElement).click();
            }, applyBtn);

            console.log('✅ Clicked APPLY button');

            // Wait for filter to apply
            await browser.pause(3000);

        } catch (error: any) {
            console.error('❌ Error clicking Apply:', error.message);
            throw error;
        }
    }

    // Get filtered results count
    async getFilteredResultsCount(): Promise<number> {
        try {
            await this.autoHandlePopup();

            // 🔥 Same XPath converted to WDIO
            const countElement = await $('//span[contains(@class,"heading-spacing") and contains(text(),"options")]');

            await countElement.waitForDisplayed({ timeout: 10000 });

            const text = await countElement.getText();

            console.log(`🔍 Raw Count Text: ${text}`);

            // Extract number (e.g., "605 options" → 605)
            const count = parseInt(text.match(/(\d+)/)?.[1] || '0');

            console.log(`✅ Metal Benches Count = ${count}`);

            return count;

        } catch (error: any) {
            console.error('❌ Error getting filtered count:', error.message);
            return 0;
        }
    }

    // Scroll and capture results
    async scrollAndCaptureResults(): Promise<void> {
        try {
            // Scroll slowly (like user)
            for (let i = 0; i < 3; i++) {
                await browser.execute(() => window.scrollBy(0, 250));
                await browser.pause(1000);
            }

            console.log('✅ Scrolled to Metal benches');

            // Screenshot after scroll
            // const path = './screenshots/metal_benches_full.png';
            // await browser.saveScreenshot(path);

            // console.log(`📸 Screenshot saved: ${path}`);

        } catch (error: any) {
            console.error('❌ Error capturing screenshot:', error.message);
        }
    }

    // Take screenshot
    // async takeScreenshot(name: string): Promise<void> {
    //     const path = `./screenshots/${name}.png`;
    //     await browser.saveScreenshot(path);
    //     console.log(`📸 Screenshot saved: ${path}`);
    // }

    async takeScreenshot(name: string): Promise<void> {
        const screenshot = await browser.takeScreenshot();

        // Save file
        const path = `./screenshots/${name}.png`;
        await browser.saveScreenshot(path);

        // 🔥 Attach to Allure
        allure.addAttachment(
            name,
            Buffer.from(screenshot, 'base64'),
            'image/png'
        );

        console.log(`📸 Screenshot saved & attached: ${path}`);
    }
}

// Export instance
export const furniturePage = new FurniturePage();