const puppeteer = require('puppeteer');


(async () => {



    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height: 1800
    })
    await page.goto('https://www.wowhead.com/alchemy-recipe-items?filter=166;8;0#0+18', {
        waitUntil: 'domcontentloaded'
    });
    await page.waitFor(4000);
    const getRecipes = await page.evaluate(() => {
        let recipesArray = [];
        let nextButton = document.querySelector("#lv-items > div.listview-band-bottom > div.listview-nav > a:nth-child(4)");

        function fillArray(array) {
            let table = Array.from(document.querySelectorAll('table.listview-mode-default tbody tr td div.iconmedium a'));
            array.push(table.map(link =>
                link.getAttribute("href")
            ));
        }
        while (window.getComputedStyle(nextButton).display !== "none") {
            fillArray(recipesArray);
            nextButton.click();
        }
        fillArray(recipesArray);


        return recipesArray;

    })


    let merged = [].concat.apply([], getRecipes);
    console.log(merged.length)
    let url = 'https://www.wowhead.com' + merged[0];



    await page.goto(url, {
        waitUntil: 'domcontentloaded'
    });
    await page.waitFor(2000);
    await browser.close();
})();