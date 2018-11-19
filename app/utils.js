// @flow
export default function waitFor(seconds: number): Promise<void> {
    return new Promise((resolve, reject) => {
        console.log(`Waiting for ${seconds}s...`);
        setTimeout(() => {
            console.log("Resuming.");
            resolve();
        }, seconds * 1000);
    });
}
