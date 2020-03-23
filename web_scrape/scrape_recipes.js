const puppeteer = require('puppeteer');
const fs = require('fs');

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
    await page.goto('https://www.wowhead.com/tailoring-pattern-items?filter=166;8;0', {
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
    // Create a set to get rid of all the duplicates and a new array to hold the final links.
    let recipesLinkSet = new Set();
    let recipesNoDupLinks = [];



    // function that will remove duplicates
    function removeDuplicateLinks(linksArray) {
        // Loop through the array and add unique recipes to the set.
        for (let i = 0; i < linksArray.length; i++) {
            // Variable to hold the sets size.
            let setSize = recipesLinkSet.size;
            // Variables to pull out the links from the HTML
            let startOfLink = (linksArray[i].indexOf("<a href=\"/item="))
            let endOfLink = (linksArray[i].indexOf("</a>"));
            let recipeAHref = linksArray[i].substring(startOfLink, endOfLink);
            let quoteRegex = "\"";
            // Variable that holds the text inbetween the a href link from the html. Used to check if its unique.
            let recipeItemLink = recipeAHref.substring(recipeAHref.indexOf(quoteRegex) + 1, recipeAHref.indexOf(quoteRegex, recipeAHref.indexOf(quoteRegex) + 1));
            // Add the recipe's item link to the set, if its a duplicate then we wont add it.
            recipesLinkSet.add(recipeItemLink.substring(recipeItemLink.lastIndexOf("/")));
            // Once added we make a variable to hold the sets new size if it changed.
            let newSetLength = recipesLinkSet.size;
            // Check if the size of the set changed, if it did it means we have a new unique link and we should add it to the final array.
            if (newSetLength > setSize) {
                recipesNoDupLinks.push("https://www.wowhead.com".concat(recipeItemLink));
            }



        }
    }
    removeDuplicateLinks(recipesLinkList);

    // Filewrite to write all the links that we can later use to go to those pages and retrieve the recipe data from.
    let file = fs.createWriteStream('Tailoring_Recipes.txt');
    file.on('error', function (error) {
        console.log(error)
    });
    recipesNoDupLinks.forEach(value => {

        file.write(value + '\n');
    });
    file.end();







    await page.waitFor(2000);


    await browser.close();
})();