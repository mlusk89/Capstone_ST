
import Home from './baseURL.js';
import { expect } from '@wdio/globals'
import Setup from './function.setup.js'
import Selectors from '../pageobjects/selectorSetup.js'

class Codex extends Home {

    async codexDropdown(){
        await Selectors.btnDropCodex.waitForDisplayed({ timeout: 5000 })
        await Setup.openClose(Selectors.btnDropCodex, Selectors.btnItems)
        await Selectors.btnDropCodex.click();
        await Selectors.btnItems.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/codex/items");
        await Selectors.btnDropCodex.click();
        await expect(Selectors.btnItemsHi).toExist();
        await Selectors.btnBuildings.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/codex/buildings");
        await Selectors.btnDropCodex.click();
        await expect(Selectors.btnBuildingsHi).toExist();
        await Selectors.btnSchema.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/codex/schematics");
        await Selectors.btnDropCodex.click();
        await expect(Selectors.btnSchemaHi).toExist();
    }

} 


export default new Codex();
