import { $ } from '@wdio/globals';
import Home from './baseURL.js';
import { expect } from '@wdio/globals'
import Setup from '../pageobjects/function.setup.js'

class AdvFilters extends Home {
    
    async filtersTest() {
        await Setup.btnDropCodex.waitForDisplayed({ timeout: 5000 })
        await Setup.btnDropCodex.click();
        await expect(Setup.btnItems).toBeDisplayed();
        await Setup.btnItems.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/codex/items");
        await Setup.openClose(Setup.btnAdv, Setup.chkRad);
        await Setup.btnAdv.click();
        await expect(Setup.chkRad).toBeDisplayed();
        await Setup.chkRad.click();
        await expect(Setup.chkRad).toBeChecked()
        await Setup.chkEnergy.click();
        await expect(Setup.chkEnergy).toBeChecked()
        await Setup.chkRad.click();
        await expect(Setup.chkRad).not.toBeChecked()
        await Setup.chkEnergy.click();
        await expect(Setup.chkEnergy).not.toBeChecked()
        await Setup.openClose(Setup.dropStack, Setup.stackFocus);
        await Setup.openClose(Setup.dropPhys, Setup.physSubEle);
        await this.stackLoop();
        await this.physLoop();
        
    }

    async stackLoop() {
        const stackDropdown = await Setup.dropStack
        const stackOptions = await stackDropdown.$$('option');
        for (let i = 0; i < stackOptions.length; i++) {
            await stackDropdown.selectByIndex(i); 
        }
    } 
    async physLoop() {
        const physDropdown = await Setup.dropPhys
        const physOptions = await physDropdown.$$('option');
        for (let i = 0; i < physOptions.length; i++){
            await physDropdown.selectByIndex(i);
        }
    }
   
}

export default new AdvFilters();