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
    await page.goto('https://www.wowhead.com/alchemy-recipe-items?filter=166;8;0', {
        waitUntil: 'domcontentloaded'
    });
    await page.waitFor(4000);

    const getRecipeLinks = await page.evaluate(() => {
        // Array to hold the links to all the recipes where we will get the information.
        let recipeLinksArray = [];
        // Next button variable that we will need to click if it exist so we don't miss recipes.
        let nextButton = document.querySelector("#lv-items > div.listview-band-bottom > div.listview-nav > a:nth-child(4)");

        // Function that will find the table of recipes and will fill the passed in array with the links.
        function fillArray(array) {
            let table = Array.from(document.querySelectorAll('table.listview-mode-default tbody tr'));


            array.push(table.map(row => {


                if (row.innerHTML.match("<span class=\"q2\">")) {
                    if (!row.innerHTML.match("Rank 2")) {

                        return row.innerHTML;

                    }
                } else if (row.innerHTML.match("<span class=\"q2\">") == null) {

                    return row.innerHTML;
                }


            }));
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

    let recipesLinkList = [].concat.apply([], getRecipeLinks).filter(value => value != null);
    let recipesLinkSet = new Set();
    let recipesNoDupLinks = [];




    for (let i = 0; i < recipesLinkList.length; i++) {
        let setSize = recipesLinkSet.size;
        let startOfLink = (recipesLinkList[i].indexOf("<a href=\"/item="))
        let endOfLink = (recipesLinkList[i].indexOf("</a>"));
        let recipeAHref = recipesLinkList[i].substring(startOfLink, endOfLink);
        let quoteRegex = "\"";
        let recipeItemLink = recipeAHref.substring(recipeAHref.indexOf(quoteRegex) + 1, recipeAHref.indexOf(quoteRegex, recipeAHref.indexOf(quoteRegex) + 1));
        recipesLinkSet.add(recipeItemLink.substring(recipeItemLink.lastIndexOf("/")));
        let newSetLength = recipesLinkSet.size;
        if (newSetLength > setSize) {
            recipesNoDupLinks.push("https://www.wowhead.com".concat(recipeItemLink));
        }



    }
    console.log(recipesNoDupLinks);
    console.log(recipesNoDupLinks.length);






    //let url = 'https://www.wowhead.com' + merged[0];

    // Iterate through all of the recipe links to retrieve the recipe data.
    // for (let link in recipesList) {
    //     console.log(`${recipesList[link]}`);
    // }


    await page.waitFor(2000);


    await browser.close();
})();