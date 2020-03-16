// Create new tab for the recipe page.
let page2 = await browser.newPage();
await page2.goto('https://www.wowhead.com/item=169497/recipe-superior-battle-potion-of-intellect', {
    waitUntil: 'load'
});

await page2.waitFor(2000);
// Click a button which holds all the information we need, then grab that data and store it.
const getRecipeData = await page2.evaluate(() => {
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
    return recipeImageLink + " " + recipeName + " " + recipeReagentsArray;
});

console.log(getRecipeData)
await page2.waitFor(1000)

page2.close()