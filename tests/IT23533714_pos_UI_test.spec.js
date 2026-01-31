const { test, expect } = require('@playwright/test');


test('Pos_UI_0001 - clears input and output when clear button is clicked', async ({ page }) => {
  // Navigate to the translator website
  await page.goto('https://www.swifttranslator.com/translator.html');
  await page.waitForLoadState('networkidle');
  
  const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
  await inputBox.click();
  
  const testText = 'mama mal valata kaemathi';
  await inputBox.type(testText, { delay: 100 });
  
  await page.waitForTimeout(2000);
  
  const clearButton = page.locator('button:has-text("🗑️"), button:has-text("Clear")').first();
  await expect(clearButton).toBeVisible();
  await clearButton.click();
  
  const inputValue = await inputBox.inputValue();
  expect(inputValue).toBe('');
  
  const outputSelectors = [
    '[id*="output"]',
    '[class*="output"]',
    'div:has-text("Sinhala") + div',
    'textarea:not([placeholder*="Input"])'
  ];
  
  let outputCleared = false;
  for (const selector of outputSelectors) {
    const outputElement = page.locator(selector).first();
    if (await outputElement.count() > 0) {
      const outputText = await outputElement.textContent();
      if (outputText.trim() === '') {
        outputCleared = true;
        break;
      }
    }
  }
  
  if (!outputCleared) {
    const pageText = await page.textContent('body');
    expect(pageText).not.toContain('මම'); 
  }
  
  console.log('Clear button test passed: Input and output fields cleared successfully');
});