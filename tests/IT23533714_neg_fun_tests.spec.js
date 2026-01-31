const { test, expect } = require('@playwright/test');

test.describe('Negative Functional Tests - Singlish to Sinhala', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/translator.html');
    await page.waitForLoadState('networkidle');
  });

  // Helper function to trigger translation
  async function triggerTranslation(page) {
    await page.keyboard.press('Space');
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(1000);
  }

  // Helper to check that output is NOT equal to expected
  async function checkTranslationNotEqual(page, expectedSinhala) {
    const outputText = await page.locator('.sinhala-output-selector').textContent(); // Replace with actual selector
    expect(outputText).not.toBe(expectedSinhala);
  }

  // Neg_Fun_0001
  test('Neg_Fun_0001 - does not translate misspelled words correctly', async ({ page }) => {
    const inputText = 'mame puthk kiyawnnva';
    const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    
    await inputBox.click();
    await page.keyboard.type(inputText, { delay: 100 });
    
    await triggerTranslation(page);
    
    const expected = 'මම පොතක් කියවනවා';
    await checkTranslationNotEqual(page, expected);
  });

  // Neg_Fun_0002 
  test('Neg_Fun_0002 - does not translate mixed English correctly', async ({ page }) => {
    const inputText = 'mama going home now. heta enanm.';
    const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    
    await inputBox.click();
    await page.keyboard.type(inputText, { delay: 100 });
    
    await triggerTranslation(page);
    
    const expected = 'මම දැන් ගෙදර යනවා. හෙට එන්නම්.';
    await checkTranslationNotEqual(page, expected);
  });

  // Neg_Fun_0003 
  test('Neg_Fun_0003 - does not translate slang correctly', async ({ page }) => {
    const inputText = 'Anney Ammo!';
    const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    
    await inputBox.click();
    await page.keyboard.type(inputText, { delay: 100 });
    
    await triggerTranslation(page);
    
    const expected = 'අනේ අම්මෝ!';
    await checkTranslationNotEqual(page, expected);
  });

  // Neg_Fun_0004 
  test('Neg_Fun_0004 - does not translate English month correctly', async ({ page }) => {
    const inputText = 'magee upan dhinaya February 11 venidhayi';
    const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    
    await inputBox.click();
    await page.keyboard.type(inputText, { delay: 100 });
    
    await triggerTranslation(page);
    
    const expected = 'මගේ උපන් දිනය පෙබරවාරි 11 වැනිදායි.';
    await checkTranslationNotEqual(page, expected);
  });

  // Neg_Fun_0005 
  test('Neg_Fun_0005 - handles empty input incorrectly', async ({ page }) => {
    const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    
    await inputBox.click();
    await inputBox.clear();
    
    await triggerTranslation(page);
    
    const output = await page.locator('.sinhala-output-selector').textContent();
    expect(output.trim()).toBe(''); 
  });

  // Neg_Fun_0006 
  test('Neg_Fun_0006 - does not handle alphanumeric input correctly', async ({ page }) => {
    const inputText = 'm@ma yanav@ h3ta Campus 3kata';
    const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    
    await inputBox.click();
    await page.keyboard.type(inputText, { delay: 100 });
    
    await triggerTranslation(page);
    
    const expected = 'මම යනවා හෙට කැම්පස් එකට';
    await checkTranslationNotEqual(page, expected);
  });

  // Neg_Fun_0007 
  test('Neg_Fun_0007 - does not keep currency symbol unchanged', async ({ page }) => {
    const inputText = 'Rs. 27560';
    const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    
    await inputBox.click();
    await page.keyboard.type(inputText, { delay: 100 });
    
    await triggerTranslation(page);
    
    const output = await page.locator('.sinhala-output-selector').textContent();
    expect(output).not.toContain('Rs.'); 
  });

  // Neg_Fun_0008 
  test('Neg_Fun_0008 - does not preserve extra spaces', async ({ page }) => {
    const inputText = 'Mama        paadam     karanna yanavaa';
    const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    
    await inputBox.click();
    await page.keyboard.type(inputText, { delay: 100 });
    
    await triggerTranslation(page);
    
    const output = await page.locator('.sinhala-output-selector').textContent();
    
    expect(output).not.toContain('       '); 
  });

  // Neg_Fun_0009 
  test('Neg_Fun_0009 - does not split joined words correctly', async ({ page }) => {
    const inputText = 'Mamakadeatayanavaa';
    const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    
    await inputBox.click();
    await page.keyboard.type(inputText, { delay: 100 });
    
    await triggerTranslation(page);
    
    const expected = 'මම කඩේට යනවා';
    await checkTranslationNotEqual(page, expected);
  });

  // Neg_Fun_0010 
  test('Neg_Fun_0010 - fails on long paragraph input', async ({ page }) => {
    const longInput = `Poth path kiyawima kiyanne ape jiwiteta hugak prayojanawath deyak. Eya ape daenuma wadi karanna wagema, nava lokayan saha vividha sankalpa gaena hithanna apawa purudu karanawa. Kiyawana wita ape tiket shakthiya saha awadhanaya thiyunu wana athara, eya manasika nirathawadi bawatath loku sahayak wenawa. Athishaya busy diviyak gatha karana apata, pothak kiyawana eka dadi manasika nidahasak saha sansunthawak laba denna samath wenawa. Ita amatharawa, bhashawa ha wachana haewichchiya gaena thiyena dakunatha kiyawimen wardhanaya wenawa. Mulu gedaram pirisidu karala ivara wela, niwadu dawasaka nishshabda parisarayaka pothak kiyawanna laebena eka aththatama loku bhagyayak saha supiri anubhavayak kiyala kiyanna puluwan`;
    
    const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    
    await inputBox.click();
    await page.keyboard.type(longInput, { delay: 50 });
    
    await triggerTranslation(page);
    
    const output = await page.locator('.sinhala-output-selector').textContent();
    
    expect(output.length).toBeLessThan(longInput.length); 
  });
});