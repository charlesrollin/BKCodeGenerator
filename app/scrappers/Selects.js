const { By } = require("selenium-webdriver");

export async function handleSelects(driver, interact = true) {
    const optionsPerSelectId = {};
    const selects = await driver.findElements(By.tagName("select"));
    await Promise.all(
        selects.map(async select => {
            const selectId = await select.getAttribute("name");
            const options = await select.findElements(By.tagName("option"));
            optionsPerSelectId[selectId] = options;
        })
    );
    console.log(`Found ${Object.keys(optionsPerSelectId).length} selects:`);
    Object.keys(optionsPerSelectId).forEach(key => {
        console.log(`- ${key}: ${optionsPerSelectId[key].length} options`);
    });
    if (interact) {
        await Promise.all(
            Object.keys(optionsPerSelectId).map(async key => {
                const index = Math.floor(
                    Math.random() * optionsPerSelectId[key].length
                );
                await optionsPerSelectId[key][index].click();
            })
        );
    }
}

export default {
    handleSelects,
};
