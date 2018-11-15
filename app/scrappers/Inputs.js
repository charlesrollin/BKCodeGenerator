const { By } = require("selenium-webdriver");

// Default BK Code
let bkCode = "21018";
export function setBKCode(code) {
    bkCode = code;
}

async function handleNestedRadioInputs(
    driver,
    parentCondition,
    interact = true
) {
    const inputsPerName = {};
    const inputs = await driver.findElements(parentCondition);
    await Promise.all(
        inputs.map(async input => {
            const realInput = await input.findElement(By.tagName("input"));
            const spanInput = await input.findElement(
                By.className("radioSimpleInput")
            );
            const inputName = await realInput.getAttribute("name");
            inputsPerName[inputName] = [
                ...(inputsPerName[inputName] || []),
                spanInput,
            ];
        })
    );
    console.log(
        `Found ${Object.keys(inputsPerName).length} radio input groups:`
    );
    Object.keys(inputsPerName).forEach(key => {
        console.log(`- ${key}: ${inputsPerName[key].length} items`);
    });
    if (interact) {
        await Promise.all(
            Object.keys(inputsPerName).map(async key => {
                const index = Math.floor(
                    Math.random() * inputsPerName[key].length
                );
                await inputsPerName[key][index].click();
            })
        );
    }
}

export async function handleRadioInputsInSpan(driver, interact = true) {
    await handleNestedRadioInputs(
        driver,
        By.className("radioButtonHolder"),
        interact
    );
}

export async function handleRadioInputsInTable(driver, interact = true) {
    await handleNestedRadioInputs(
        driver,
        By.className("inputtyperbloption"),
        interact
    );
}

function textForTextInput(name) {
    switch (name) {
        case "SurveyCode":
            return bkCode;
        default:
            return "texte par défaut";
    }
}

export async function handleTextInputs(driver, interact = true) {
    const textInputsByName = {};
    const inputs = await driver.findElements(By.css("input[type='text']"));
    await Promise.all(
        inputs.map(async input => {
            const isDisplayed = await input.isDisplayed();
            if (isDisplayed) {
                const inputName = await input.getAttribute("name");
                textInputsByName[inputName] = input;
            }
        })
    );
    console.log(`Found ${Object.keys(textInputsByName).length} text inputs.`);
    if (interact) {
        await Promise.all(
            Object.keys(textInputsByName).map(async key => {
                await textInputsByName[key].sendKeys(textForTextInput(key));
            })
        );
    }
}
export async function handleCheckboxes(driver, interact = true) {
    const inputsPerName = {};
    const inputs = await driver.findElements(By.className("checkboxholder"));
    await Promise.all(
        inputs.map(async input => {
            const realInput = await input.findElement(By.tagName("input"));
            const spanInput = await input.findElement(
                By.className("checkboxSimpleInput")
            );
            const inputName = await realInput.getAttribute("name");
            inputsPerName[inputName] = [
                ...(inputsPerName[inputName] || []),
                spanInput,
            ];
        })
    );
    console.log(
        `Found ${Object.keys(inputsPerName).length} checkbox input groups:`
    );
    Object.keys(inputsPerName).forEach(key => {
        console.log(`- ${key}: ${inputsPerName[key].length} checkboxes`);
    });
    if (interact) {
        await Promise.all(
            Object.keys(inputsPerName).map(async key => {
                const index = Math.floor(
                    Math.random() * inputsPerName[key].length
                );
                await inputsPerName[key][index].click();
            })
        );
    }
}
