import { test, expect } from '@playwright/test';

test.describe('Growth Lab Redesign Verification', () => {

    test.beforeEach(async ({ page }) => {
        test.setTimeout(60000);
    });

    test('Homepage show experiments and navigate to detail', async ({ page }) => {
        console.log('Starting Homepage Navigation Test');
        await page.goto('/');

        // Explicitly wait for full app load
        await page.waitForLoadState('load');
        await page.waitForTimeout(2000); // Small grace period for React hydration

        // Confirm the page is alive by looking for the main hero or headings
        await expect(page.locator('h1').first()).toBeVisible({ timeout: 15000 });

        // Look for the View Case Studies linked button
        const experimentLink = page.locator('a[href*="/case-studies"]').first();
        const count = await experimentLink.count();
        console.log(`Found experiment links count: ${count}`);

        if (count > 0) {
            const href = await experimentLink.getAttribute('href');
            console.log('Identified Link href:', href);
            await experimentLink.click();
            await page.waitForTimeout(1000);
            console.log('Current URL after click:', page.url());
            await expect(page).toHaveURL(/.*case-studies.*/, { timeout: 10000 });
        } else {
            // Dump some page content to console for debugging
            const bodyText = await page.innerText('body');
            console.log('Body snippet:', bodyText.substring(0, 500));
            throw new Error('No experiment links found on homepage');
        }
    });

    test('Experiment Detail Page displays analytical sections', async ({ page }) => {
        console.log('Starting Experiment Detail Verification');
        await page.goto('/#/case-studies/ecommerce-organic-growth');

        await expect(page.locator('h1')).toBeVisible({ timeout: 20000 });
        console.log('Header visible:', await page.locator('h1').innerText());

        await expect(page.locator('#goal')).toBeVisible();
        await expect(page.locator('#funnel')).toBeVisible();
        await expect(page.locator('#performance')).toBeVisible();
        await expect(page.getByText('Next Experiments')).toBeVisible();
        console.log('Detail page sections verified');
    });
});
