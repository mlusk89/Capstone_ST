import { $ } from '@wdio/globals';
import Home from './baseURL.js';
import { expect } from '@wdio/globals'
import Setup from './function.setup.js'

class Codex extends Home {

    async codexDropdown(){
        await Setup.btnDropCodex.waitForDisplayed({ timeout: 5000 })
        await Setup.openClose(Setup.btnDropCodex)
        await Setup.btnDropCodex.click();
        await Setup.btnItems.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/codex/items");
        await Setup.btnDropCodex.click();
        await expect(Setup.btnItemsHi).toExist();
        await Setup.btnBuildings.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/codex/buildings");
        await Setup.btnDropCodex.click();
        await expect(Setup.btnBuildingsHi).toExist();
        await Setup.btnSchema.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/codex/schematics");
        await Setup.btnDropCodex.click();
        await expect(Setup.btnSchemaHi).toExist();
    }

} 


export default new Codex();
