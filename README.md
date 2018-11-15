# BKCodeGenerator

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A node script that uses Selenium Web Driver to automatically retrieves a free-burger code from BK.

This script currently works **on MacOS only** because it uses a Web Driver for Safari.

## Safari prerequisite

You will need to enable Remote Automation in the Develop menu of Safari before running this script.

To do so:

- Choose Safari > Preferences and on the Advanced tab, select "Show Develop menu in menu bar
- Chosse Develop > Allow Remote Automation

## Getting started

Clone the repo:

```bash
cd /Users/user/my_project # Replace with your own path
git clone https://github.com/CRollin/BKCodeGenerator.git
```

Install dependencies:

```bash
npm install
```

Run the script:

```bash
npm start [BKCode] # code of a BK store, defaults to BK21017
```

## Known issues

It seems that Selenium needs to keep its browser window in the active desktop to work.

Leaving the desktop in which this script is running will cause a `ScriptTimeoutError` and will terminate the program.
