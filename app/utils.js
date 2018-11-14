function waitFor(seconds) {
  return new Promise((resolve, reject) => {
    console.log(`Waiting for ${seconds}s...`)
    setTimeout(() => {
      console.log('Resuming.');
      resolve();
    }, seconds * 1000);
  });
}

module.exports = {
  waitFor
};
