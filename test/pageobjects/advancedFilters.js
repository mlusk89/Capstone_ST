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
        await this.physLoop2();
        await this.integration(Setup.chkRad, Setup.chkEnergy);
        
        
        
    }

    async stackLoop() {
        const stackDropdown = await Setup.dropStack
        const stackOptions = await stackDropdown.$$('option');
        for (let i = 0; i < stackOptions.length; i++) {
            await stackDropdown.selectByIndex(i); 
            let selectedOption = await stackDropdown.getValue();
            let expectedOption = await stackOptions[i].getAttribute('value');
            await expect(selectedOption).toBe(expectedOption);
        }
    } 

    async physLoop() {
        const physDropdown = await Setup.dropPhys
        const physOptions = await physDropdown.$$('option');
        for (let i = 0; i < physOptions.length; i++){
            await physDropdown.selectByIndex(i);
            let selectedOption = await physDropdown.getValue();
            let expectedOption = await physOptions[i].getAttribute('value');
            await expect(selectedOption).toBe(expectedOption);
        }
    }

    async physLoop2() {
        const physDropdown = await Setup.dropPhys
        const physOptions = await physDropdown.$$('option');
        for (let i = 0; i < physOptions.length; i++){
            await physDropdown.selectByIndex(i);
            let selectedOption = await physDropdown.getValue();
            if (selectedOption === '0') {
                await expect(Setup.recipeList).toHaveChildren({ eq: 139 });
            } else if (selectedOption === '1') {
                await expect(Setup.recipeList).toHaveChildren({ eq: 124 });
            } else if (selectedOption === '2') {
                await expect(Setup.recipeList).toHaveChildren({ eq: 15 });
            }
           }
        }

    async physStateDropdown() {
        await Setup.dropPhys.click();
        await Setup.physSolid.click();
        await expect(Setup.recipeList).toHaveChildren({ eq: 124 })
        await Setup.dropPhys.click();
        await Setup.physLiquid.click();
        await expect(Setup.recipeList).toHaveChildren({ eq: 15 })
        await Setup.dropPhys.click();
        await Setup.physAny.click();
        await expect(Setup.recipeList).toHaveChildren({ eq: 139 })
    }

    async integration(check1, check2) {
        await check1.click();
        await expect(check1).toBeChecked();
        await this.stackLoop();
        await this.physLoop();
        await check2.click();
        await expect(check2).toBeChecked();
        await this.stackLoop();
        await this.physLoop();
        await check1.click();
        await expect(check1).not.toBeChecked();
        await expect(check2).toBeChecked();
        await this.stackLoop();
        await this.physLoop();
        await check2.click();
        await expect(check2).not.toBeChecked();
    }
   
}

export default new AdvFilters();