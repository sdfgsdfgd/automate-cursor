const puppeteer = require('puppeteer-core');

/**
 * Automate Cursor agent (CMD+I) interaction
 * Usage: node index.js "Your query here"
 */
(async () => {
  // Get query from command line or use default
  const query = process.argv[2] || 'What are the keyboard shortcuts in Cursor?';
  
  let browser;
  try {
    // Connect to Cursor
    browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
    const [page] = await browser.pages();
    console.log('Connected to Cursor');
    
    // First check if agent input is already present
    let agentInputExists = await page.evaluate(() => {
      return !!document.querySelector('.aislash-editor-input');
    });
    
    // Only open agent with CMD+I if input field isn't already visible
    if (!agentInputExists) {
      console.log('Agent window not open, triggering with CMD+I');
      await page.keyboard.down('Meta');
      await page.keyboard.press('i');
      await page.keyboard.up('Meta');
      
      // Wait briefly for agent UI to appear
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check again for the input field
      agentInputExists = await page.evaluate(() => {
        return !!document.querySelector('.aislash-editor-input');
      });
    } else {
      console.log('Agent window already open');
    }
    
    if (agentInputExists) {
      // Click, type and submit
      await page.click('.aislash-editor-input');
      await page.keyboard.type(query);
      await page.keyboard.press('Enter');
      console.log(`Sent query: "${query}"`);
    } else {
      console.log('Agent input field not found, even after trying CMD+I');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Clean up and exit immediately
    if (browser) {
      await browser.disconnect();
    }
    console.log('Done');
    process.exit(0);
  }
})(); 