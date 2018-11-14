const { Builder, By, Capabilities, until } = require("selenium-webdriver");

const {
  handleCheckboxes,
  handleRadioInputsInSpan,
  handleRadioInputsInTable,
  handleTextInputs
} = require("./Scrappers/Inputs");

const { handleSelects } = require("./scrappers/Selects");

async function example() {
  const stdin = process.stdin;
  let driver = await new Builder().forBrowser('safari').build();
  await driver.manage().setTimeouts({ implicit: 5000 });
  let keepGoing = true;
  let stepCount = 0;
  try {
    await driver.get("https://www.bkvousecoute.fr/");
    while (keepGoing) {
      console.log(`Entering step ${stepCount}`);
      keepGoing = await handleStep(driver);
      stepCount++;
    }
    console.log(await getCodeString(driver));
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Press enter to quit the script:");
    stdin.resume();
    stdin.on("data", () => end(driver));
  }
}

async function end(driver) {
  try {
    await driver.quit();
  } finally {
    process.exit();
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
  return await driver.findElement(By.className('ValCode')).getText();
}

async function handleStep(driver) {
  await handleRadioInputsInSpan(driver);
  await handleRadioInputsInTable(driver);
  await handleSelects(driver);
  await handleCheckboxes(driver);
  // Text inputs should come last: some checkboxes / radios may show additional inputs on click
  await handleTextInputs(driver);
  return await goToNextStep(driver);
}

example();
