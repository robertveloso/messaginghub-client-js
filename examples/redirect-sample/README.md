# redirect-sample
> A bot that show how to redirect messages from an automatic bot to a humman attendance bot using BLiP `master` template. Check [BLiP documentation](https://portal.blip.ai/#/docs/templates/master) to see more about master template.

This example demonstrates the use of the BLiP `master` template to build a simple bot composed by two sub bots A1 and A2.

* A1 is a `sdk` template. Automatic bot that can redirect messages to A2
* A2 is a `atendance` template bot (without code, created on [BLiP portal](https://portal.blip.ai))

> **Note:** In this case you also need create a master bot that contains A1 and A2 as sub bots.

## How to run

This sample has only the code of the automatic bot (A1) able to redirect messages to another bot.
The redirect process you occur only if this bot is a sub bot of any master bot.

In order to run this example, run the following commands on a terminal, which will install the package dependencies for this sample and run the `index.js` file:
```bash
npm install
npm start
```
