const { test, expect } = require('@playwright/test');

test.describe('Positive Functional Tests - Singlish to Sinhala', () => {

  test.beforeEach(async ({ page }) => {
    // Navigates to the translator website before each test
    await page.goto('https://www.swifttranslator.com/translator.html');
    await page.waitForLoadState('networkidle');
  });

  // Helper function to trigger translation
  async function triggerTranslation(page) {
    await page.keyboard.press('Space');
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(1000);
  }

  // Helper function to check translation
  async function checkTranslation(page, expectedSinhalaWords) {
    for (const word of expectedSinhalaWords) {
      await expect(page.locator('body')).toContainText(word, { timeout: 20000 });
    }
  }

  // Helper function to fill input and check translation
  async function testTranslation(page, inputText, expectedWords) {
    const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    
    await inputBox.click();
    await page.keyboard.type(inputText, { delay: 100 });
    
    await triggerTranslation(page);
    await checkTranslation(page, expectedWords);
  }

  // Pos_Fun_0001
  test('Pos_Fun_0001 - converts a simple present tense', async ({ page }) => {
    await testTranslation(page, 'Mama pan kanava', ['මම', 'පන්', 'කනව']);
  });

  // Pos_Fun_0002
  test('Pos_Fun_0002 - converts a simple request', async ({ page }) => {
    await testTranslation(page, 'vathura genna', ['වතුර', 'ගෙන්න']);
  });

  // Pos_Fun_0003
  test('Pos_Fun_0003 - converts a compound sentence', async ({ page }) => {
    await testTranslation(page, 'mama padam karanna yanava, saha passe nidagannava', 
      ['මම', 'පඩම්', 'කරන්න', 'යනව', 'සහ', 'පස්සෙ', 'නිඩගන්නව']);
  });

  // Pos_Fun_0004
  test('Pos_Fun_0004 - converts complex conditional sentence', async ({ page }) => {
    await testTranslation(page, 'Oya velavata vada kaloth, apita havas venna kalin gedara yanna puluvan', 
      ['ඔය', 'වෙලවට', 'වඩ', 'කලොත්', 'අපිට', 'හවස්', 'වෙන්න', 'කලින්', 'ගෙඩර', 'යන්න', 'පුලුවන්']);
  });

  // Pos_Fun_0005
  test('Pos_Fun_0005 - converts an interrogative question', async ({ page }) => {
    await testTranslation(page, 'Meaka kohen gaththe?', ['මේක', 'කොහෙන්', 'ගත්තෙ?']);
  });

  // Pos_Fun_0006
  test('Pos_Fun_0006 - converts imperative commands', async ({ page }) => {
    await testTranslation(page, 'vahaama dhora arinda', ['වහාම', 'දොර', 'අරින්ඩ']);
  });

  // Pos_Fun_0007
  test('Pos_Fun_0007 - converts negative sentences', async ({ page }) => {
    await testTranslation(page, 'Mama vaeradhi karanne naehae', ['මම', 'වැරදි', 'කරන්නේ', 'නැහැ']);
  });

  // Pos_Fun_0008
  test('Pos_Fun_0008 - converts polite request', async ({ page }) => {
    await testTranslation(page, 'karunaakara mata ida dhenna', ['කරුනාකර', 'මට', 'ඉඩ', 'දෙන්න']);
  });

  // Pos_Fun_0009
  test('Pos_Fun_0009 - converts an informal phrase', async ({ page }) => {
    await testTranslation(page, 'araka gani', ['අරක', 'ගනි']);
  });

  // Pos_Fun_0010
  test('Pos_Fun_0010 - converts repeated words for emphasis', async ({ page }) => {
    await testTranslation(page, 'tika tika kotanda', ['ටික', 'ටික', 'කොටන්ඩ']);
  });

  // Pos_Fun_0011
  test('Pos_Fun_0011 - converts english abbreviations and short forms', async ({ page }) => {
    await testTranslation(page, 'magee ID saha NIC number eka dhenna', 
      ['මගේ', 'ID', 'සහ', 'NIC', 'number', 'එක', 'දෙන්න']);
  });

  // Pos_Fun_0012
  test('Pos_Fun_0012 - converts past tense sentences', async ({ page }) => {
    await testTranslation(page, 'Api iiyee gamanak giyaa', ['අපි', 'ඊයේ', 'ගමනක්', 'ගියා']);
  });

  // Pos_Fun_0013
  test('Pos_Fun_0013 - converts future tense sentences', async ({ page }) => {
    await testTranslation(page, 'Mama iiLAGA maasayee rata yanavaa', 
      ['මම', 'ඊළඟ', 'මාසයේ', 'රට', 'යනවා']);
  });

  // Pos_Fun_0014
  test('Pos_Fun_0014 - converts plural pronoun usage', async ({ page }) => {
    await testTranslation(page, 'Ovun kiyannee sathYaya', ['ඔවුන්', 'කියන්නේ', 'සත්‍යය']);
  });

  // Pos_Fun_0015
  test('Pos_Fun_0015 - converts mixed singlish and english terms', async ({ page }) => {
    await testTranslation(page, 'Oyaa email eka baluvaadha?', 
      ['ඔයා', 'email', 'එක', 'බලුවාද?']);
  });

  // Pos_Fun_0016
  test('Pos_Fun_0016 - converts sentence with place name', async ({ page }) => {
    await testTranslation(page, 'adha apita SLIIT Ekee exams thiyanavaadha?', 
      ['අද', 'අපිට', 'SLIIT', 'එකේ', 'exams', 'තියනවාද?']);
  });

  // Pos_Fun_0017
  test('Pos_Fun_0017 - converts punctuation usage', async ({ page }) => {
    await testTranslation(page, 'SuBha aluth avurudhdhak veevaa!', 
      ['සුභ', 'අලුත්', 'අවුරුද්දක්', 'වේවා!']);
  });

  // Pos_Fun_0018
  test('Pos_Fun_0018 - converts time format', async ({ page }) => {
    await testTranslation(page, 'Apita heta udhee 10 AM panthikyak thiyanavaa', 
      ['අපිට', 'හෙට', 'උදේ', '10', 'AM', 'පන්තික්යක්', 'තියනවා']);
  });

  // Pos_Fun_0019
  test('Pos_Fun_0019 - converts colloquial phrasing', async ({ page }) => {
    await testTranslation(page, 'ela machan supiri loku seen eka', 
      ['එල', 'මචන්', 'සුපිරි', 'ලොකු', 'සේන්', 'එකක්']);
  });

  // Pos_Fun_0020
  test('Pos_Fun_0020 - converts measurements and units', async ({ page }) => {
    await testTranslation(page, 'mata kiri liter 2k saha sugar gram 500k oonee', 
      ['මට', 'කිරි', 'liter', '2ක්', 'සහ', 'sugar', 'gram', '500ක්', 'ඕනේ']);
  });

  // Pos_Fun_0021
  test('Pos_Fun_0021 - converts multi-line input', async ({ page }) => {
    const inputText = `Mama pihinanna yanavaa,
oyaa enavadha?`;
    const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    
    await inputBox.click();
    await page.keyboard.type(inputText, { delay: 100 });
    
    await triggerTranslation(page);
    
    await checkTranslation(page, ['මම', 'පිහිනන්න', 'යනවා', 'ඔයා', 'එනවද?']);
  });

  // Pos_Fun_0022
  test('Pos_Fun_0022 - converts slang expression', async ({ page }) => {
    await testTranslation(page, 'Oyaagee kaeema supiri!', 
      ['ඔයාගේ', 'කෑම', 'සුපිරි!']);
  });

  // Pos_Fun_0023
  test('Pos_Fun_0023 - converts medium paragraph text', async ({ page }) => {
    await testTranslation(page, 'Heta udheema naegitalaa, magee vaththee thibuNu thaNa koLa kapalaa, athu kapalaa, boothal katu ivath karalaa, nava paeLa roopaNaya karalaa, vaththa lassana kara thiyagannavaa', 
      ['හෙට', 'උදේම', 'නැගිටලා', 'මගේ', 'වත්තේ', 'තිබුණු', 'තණ', 'කොළ', 'කපලා']);
  });

  // Pos_Fun_0024
  test('Pos_Fun_0024 - converts addresses and places', async ({ page }) => {
    await testTranslation(page, 'magee gedhara No. 25, Rajagiriya Road, Colombo', 
      ['මගේ', 'ගෙදර', 'No.', '25', 'Rajagiriya', 'Road', 'Colombo']);
  });
});