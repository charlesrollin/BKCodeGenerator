const { Builder, By, until } = require("selenium-webdriver");

const {
  setBKCode,
  handleCheckboxes,
  handleRadioInputsInSpan,
  handleRadioInputsInTable,
  handleTextInputs
} = require("./scrappers/Inputs");

const { handleSelects } = require("./scrappers/Selects");

async function example(bkCode, slowMode) {
  const startDate = Date.now();
  if (bkCode) {
    setBKCode(bkCode);
  }
  let driver = await new Builder().forBrowser("safari").build();
  await driver.manage().setTimeouts({ implicit: 5000 });
  let keepGoing = true;
  let stepCount = 0;
  try {
    await driver.get("https://www.bkvousecoute.fr/");
    while (keepGoing) {
      console.log(`Entering step ${stepCount}`);
      // Go slow if the user aksed to or if this is the 2nd step
      keepGoing = await handleStep(driver, slowMode || stepCount === 1);
      stepCount++;
    }
    console.log(await getCodeString(driver));
  } catch (err) {
    console.log(err);
  } finally {
    console.log(`Finished in ${(Date.now() - startDate) / 1000}`);
    await driver.quit();
  }
}

async function goToNextStep(driver) {
  const validateButtons = await driver.findElements(By.id("NextButton"));
  const hasNextStep = validateButtons.length > 0;
  if (hasNextStep) {
    await validateButtons[0].click();
    await driver.wait(until.stalenessOf(validateButtons[0]), 10000);
  }
  return hasNextStep;
}

async function getCodeString(driver) {
  return await driver.findElement(By.className("ValCode")).getText();
}

async function handleStep(driver, isSlowMode) {
  if (isSlowMode) {
    await handleRadioInputsInSpan(driver);
    await handleRadioInputsInTable(driver);
    await handleSelects(driver);
    await handleCheckboxes(driver);
    // Text inputs should come last: some checkboxes / radios may show additional inputs on click
    await handleTextInputs(driver);
  }
  return await goToNextStep(driver);
}

const argv = require('minimist')(process.argv.slice(2));

example(argv.code, argv.slowMode);
