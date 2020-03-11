const puppeteer = require('puppeteer');


(async () => {


    const browser = await puppeteer.launch({
        headless: true
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
    const data = await page.evaluate(() => {
        let recipesArray = [];
        let nextButton = document.querySelector("#lv-items > div.listview-band-bottom > div.listview-nav > a:nth-child(4)");



        function getRecipeLink(array) {
            let table = Array.from(document.querySelectorAll('table.listview-mode-default tbody tr td div.iconmedium a'));
            array.push(table.map(link => {
                return link.getAttribute("href");
            }))
        }
        //getRecipeLink(recipesArray);

        if (window.getComputedStyle(nextButton).display === "none") {
            getRecipeLink(recipesArray);
            return recipesArray;
        } else {
            getRecipeLink(recipesArray);
            await page.click(nextButton);

        }




    });
    console.log(data)


    await browser.close();
})();