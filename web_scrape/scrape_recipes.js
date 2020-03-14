const puppeteer = require('puppeteer');


(async () => {


    // Open browser to recipes list page.
    const browser = await puppeteer.launch({
        headless: true
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
        // Array to hold the links to all the recipes where we will get the information.
        let recipeLinksArray = [];
        // Next button variable that we will need to click if it exist so we don't miss recipes.
        let nextButton = document.querySelector("#lv-items > div.listview-band-bottom > div.listview-nav > a:nth-child(4)");

        // Function that will find the table of recipes and will fill the passed in array with the links.
        function fillArray(array) {
            let table = Array.from(document.querySelectorAll('table.listview-mode-default tbody tr td div.iconmedium a'));
            array.push(table.map(link =>
                link.getAttribute("href")
            ));
        }
        // while the table still has a next button, we keep filling it and go to the next section.
        while (window.getComputedStyle(nextButton).display !== "none") {
            fillArray(recipeLinksArray);
            nextButton.click();
        }
        // Once there is no next button, we found the end of the table. Fill the array with the remaining recipe links.
        fillArray(recipeLinksArray);


        return recipeLinksArray;

    })

    // Variable that holds all of the recipe links for that profession.
    let recipesLinkList = [].concat.apply([], getRecipes);


    //let url = 'https://www.wowhead.com' + merged[0];

    // for (let link in recipesList) {
    //     console.log(`${recipesList[link]}`);
    // }


    await page.waitFor(2000);
    let page2 = await browser.newPage();
    await page2.goto('https://www.wowhead.com/item=170208/recipe-potion-of-unbridled-fury', {
        waitUntil: 'load'
    });

    await page2.waitFor(2000);
    const teachesPage = await page2.evaluate(() => {
        let teachesButton = document.querySelector('#jkbfksdbl4 > div > ul > li:nth-child(3) > a');
        teachesButton.click();
        let iconImage = document.querySelector('#tab-teaches-recipe > div.listview-scroller > table > tbody > tr > td:nth-child(2) > div > ins').getAttribute("style");
        return iconImage;
    });
    let iconLink = teachesPage.replace('background-image: url("', '').replace(/"/g, '').replace(');', '').replace('medium', 'large');
    console.log(iconLink)

    page2.close()



    await browser.close();
})();