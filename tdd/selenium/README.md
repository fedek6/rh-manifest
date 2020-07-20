# Selenium

## Selenium Tests with Mocha and Chai in JavaScript

__Warning!__ Remember to install your _selenium webdriver_ accordingly to the version of Chrome.

```json
{
  "name": "selenium-mocha-chai-testing",
  "scripts": {
    "test": "node Tests/DefaultTest.js"
  },
  "private": true,
  "devDependencies": {
    "chromedriver": "^84.0.0",
    "selenium-webdriver": "^4.0.0-alpha.1"
  }
}
```

If you want to use Mocha & Chai:

```json
{
  "name": "selenium-mocha-chai-testing",
  "scripts": {
    "test": "node Tests/DefaultTest.js",
    "test-form": "node TestForm.js"
  },
  "private": true,
  "devDependencies": {
    "chromedriver": "^83.0.1",
    "selenium-webdriver": "^4.0.0-alpha.1",
    "mocha": "^5.2.0",
    "chai": "^4.1.2"
  }
}
```

Example code running with this tools:

```js
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions({
            'w3c': false
        })
        .build();

    try {
      await driver.get('http://www.google.com/ncr');
      await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
      await driver.wait(until.titleIs('webdriver - Szukaj w Google'), 1000);
    } finally {
      await driver.quit();
    }
  })();
```

If you want to run your code as _Mocha_ test:

```js
const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('DefaultTest', () => {
    const driver = new Builder().forBrowser('chrome').build();

    it('should go to realhe.ro and check the title', async () => {
        await driver.get('http://www.google.com/ncr');
        await driver.findElement(By.name('q')).sendKeys('realhe.ro', Key.RETURN);
        await driver.findElement(By.css('a[href="https://realhe.ro/"]')).click();
        await driver.sleep(2000);
        const title = await driver.getTitle();

        expect(title).to.equal('Realhe.ro');
    });

    after(async () => driver.quit());
});
```

Do not forget about configuring proper npm script in package.json:

```json
  "scripts": {
    "test": "node Tests/DefaultTest.js",
    "test-form": "node TestForm.js",
    "mocha-test": "node_modules/.bin/mocha Tests/DefaultTest.js --timeout 10000"
  },
```