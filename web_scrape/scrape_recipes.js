const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height: 1200
    })
    await page.goto('https://www.wowhead.com/alchemy-recipe-items?filter=166;8;0#0+18', {
        waitUntil: 'domcontentloaded'
    });
    await page.waitFor(4000);
    await page.evaluate(() => {
        let table = document.querySelectorAll('table.listview-mode-default tbody tr');
        const rowArray = Array.from(table);
        console.log(rowArray);
        return rowArray
    });


    await browser.close();
})();