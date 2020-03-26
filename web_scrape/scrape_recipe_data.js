//'./Profession Recipes Lists/Alchemy_Recipes.txt'
const readline = require('readline');
const fs = require('fs');
const puppeteer = require('puppeteer');


// create instance of readline
// each instance is associated with single input stream
let rl = readline.createInterface({
    input: fs.createReadStream('./Profession Recipes Lists/Alchemy_Recipes.txt')
});

// For each line in the file, navigate to that page and draw the recipe data from it.
rl.on('line', function (line) {
    scrapeRecipeData(line);
});


async function scrapeRecipeData(url) {
    // Open browser to recipes list page.
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height: 1800
    })
    await page.goto(url, {
        waitUntil: 'domcontentloaded'
    });
    await page.waitFor(2000);
    // Click a button which holds all the information we need, then grab that data and store it.
    const getRecipeData = await page.evaluate(() => {
        let teachesButton = document.querySelectorAll('[href="#teaches-recipe"]')[0];
        teachesButton.click();
        let iconLink = document.querySelector('#tab-teaches-recipe > div.listview-scroller > table > tbody > tr > td:nth-child(2) > div > ins').getAttribute("style");
        let recipeImageLink = iconLink.replace('background-image: url("', '').replace(/"/g, '').replace(');', '').replace('medium', 'large');
        let recipeName = document.querySelector('#tab-teaches-recipe > div.listview-scroller > table > tbody > tr > td:nth-child(3) > div > a').innerText;
        let recipeReagents = document.querySelectorAll('#tab-teaches-recipe > div.listview-scroller > table > tbody > tr > td:nth-child(4) > div a');
        let recipeReagentsArray = [];
        for (let i = 0; i < recipeReagents.length; i++) {
            recipeReagentsArray.push(recipeReagents[i].getAttribute("href").replace(/[^a-zA-Z]+/g, "").replace("item", ""));

        }
        let recipeReagentsQuantities = document.querySelectorAll('#tab-teaches-recipe > div.listview-scroller > table > tbody > tr > td:nth-child(4) > div > div > span > div:nth-child(1)');
        let recipeReagentsQuantitiesArray = [];
        for (let z = 0; z < recipeReagentsQuantities.length; z++) {

            recipeReagentsQuantitiesArray.push(recipeReagentsQuantities[z].innerText);

        }
        let reagentsWithNoQuantities = recipeReagentsArray.length - recipeReagentsQuantitiesArray.length;
        for (let j = 0; j < reagentsWithNoQuantities; j++) {
            recipeReagentsQuantitiesArray.push("1");
        }
        return recipeImageLink + " " + recipeName + " " + recipeReagentsArray + recipeReagentsQuantitiesArray;
    });

    console.log(getRecipeData)
    await page.waitFor(1000)

    page.close();

};