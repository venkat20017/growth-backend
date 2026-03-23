import { test, expect } from '@playwright/test';

test.describe('Contact Form Functionality', () => {

    test.beforeEach(async ({ page }) => {
        test.setTimeout(60000);
    });

    test('Contact page loads correctly with form fields', async ({ page }) => {
        await page.goto('/#/contact');

        // Verify Page title or header
        await expect(page.locator('h1')).toContainText('Get In Touch');

        // Wait for inputs to be visible
        const nameInput = page.locator('input[name="name"]');
        const emailInput = page.locator('input[name="email"]');
        const messageInput = page.locator('textarea[name="message"]');

        await expect(nameInput).toBeVisible();
        await expect(emailInput).toBeVisible();
        await expect(messageInput).toBeVisible();
    });

    test('Form validation triggers on empty submission', async ({ page }) => {
        await page.goto('/#/contact');

        const submitBtn = page.locator('button[type="submit"]');
        await expect(submitBtn).toBeVisible();

        // Native HTML5 validation will block the form submission, 
        // focus will be on the first invalid element.
        await submitBtn.click();
        
        const nameInput = page.locator('input[name="name"]');
        
        // Assert that the browser validation kicks in (the field is still invalid)
        const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
        expect(isInvalid).toBeTruthy();
    });

});
