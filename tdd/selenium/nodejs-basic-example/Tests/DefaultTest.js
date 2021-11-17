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