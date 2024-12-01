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
        await this.stackLoop2();
        await this.integration1(Setup.chkRad, Setup.chkEnergy);
        
        
        
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
                await expect(Setup.recipeList).toHaveChildren({ eq: 174 }); // any
            } else if (selectedOption === '1') {
                await expect(Setup.recipeList).toHaveChildren({ eq: 159 }); // solid
            } else if (selectedOption === '2') {
                await expect(Setup.recipeList).toHaveChildren({ eq: 15 }); // liquid
            }
           }
           await Setup.dropPhys.click();
           await Setup.physAny.click();
        }

        async stackLoop2() {
            const stackDropdown = await Setup.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 174 }); // any
                } else if (selectedOption === '1') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 16 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 62 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 56 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 27 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 13 }); // stack size 500
                }
            }
            await Setup.dropStack.click();
            await Setup.stackAny.click();
        }
    

    async integration1(check1, check2) {
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