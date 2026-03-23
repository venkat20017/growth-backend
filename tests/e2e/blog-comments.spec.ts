import { test, expect } from '@playwright/test';

test.describe('Blog Comments Functionality', () => {

    test.beforeEach(async ({ page }) => {
        test.setTimeout(60000);
    });

    test('Navigates to a blog post and verifies the Comments section renders', async ({ page }) => {
        // Go to blog root
        await page.goto('/#/blog');
        await page.waitForLoadState('load');

        // Look for the first blog article link
        const firstArticle = page.locator('a[href*="/blog/"]').first();
        const count = await firstArticle.count();
        
        // Only run the test if there's at least one blog post
        if (count > 0) {
            await firstArticle.click();
            
            // Wait for the specific blog post to load
            await expect(page.locator('h3:has-text("Comments")')).toBeVisible({ timeout: 15000 });
            
            // Verify the form is present
            await expect(page.locator('input[name="name"]')).toBeVisible();
            await expect(page.locator('input[name="email"]')).toBeVisible();
            await expect(page.locator('textarea[name="comment"]')).toBeVisible();
            await expect(page.locator('button[type="submit"]:has-text("Post Comment")')).toBeVisible();
        } else {
            console.log('No blog posts available to test.');
        }
    });

});
