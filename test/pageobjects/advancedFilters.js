
import Home from './baseURL.js';
import { expect } from '@wdio/globals'
import Setup from '../pageobjects/function.setup.js'
import Selectors from '../pageobjects/selectorSetup.js'

class AdvFilters extends Home {
    
    async filtersOpenTest() {
        await Selectors.btnDropCodex.waitForDisplayed({ timeout: 5000 })
        await Selectors.btnDropCodex.click();
        await expect(Selectors.btnItems).toBeDisplayed();
        await Selectors.btnItems.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/codex/items");
        await Setup.openClose(Selectors.btnAdv, Selectors.chkRad); //element to open and sub element to verify if open or closed
    }
    async checkTest() {    
        await Selectors.btnAdv.click();
        await expect(Selectors.chkRad).toBeDisplayed();
        await Selectors.chkRad.click();
        await expect(Selectors.chkRad).toBeChecked();
        await Selectors.chkEnergy.click();
        await expect(Selectors.chkEnergy).toBeChecked();
        await Selectors.chkRad.click();
        await expect(Selectors.chkRad).not.toBeChecked();
        await Selectors.chkEnergy.click();
        await expect(Selectors.chkEnergy).not.toBeChecked();
    }
    async stackAndPhysDropdownTest() {
        await Setup.openClose(Selectors.dropStack, Selectors.stackFocus); //element to open and sub element to verify if open or closed
        await Setup.openClose(Selectors.dropPhys, Selectors.physSubEle);
        await this.stackLoop_Functionality();
        await this.physLoop_Functionality();
        await this.physLoop_ResultCheck();
        //await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_Any);
    }
    async integrationTest() {
        await this.integrationAny(Selectors.chkRad, Selectors.chkEnergy); //element to open and sub element to verify if open or closed
        await this.integrationPhysState(Selectors.chkRad, Selectors.chkEnergy);
    }


    async integrationPhysState(check1, check2) {
        await check1.click();
        await expect(check1).toBeChecked();
        await Setup.setPhysAny();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_Radioactive);
        await Setup.setPhysLiquid();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_RadioactiveWithLiquidState);
        await Setup.setPhysSolid();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_RadioactiveWithSolidState);
        await Setup.setPhysAny();
        await check2.click();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_RadioactivewithEnergyValue);
        await Setup.setPhysSolid();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_RadioactiveWithEnergyValueandSolidState);
        await Setup.setPhysLiquid();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_RadioactiveWithEnergyValueandLiquidState);
        await Setup.setPhysAny();
        await check1.click();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_withEnergyValue);
        await Setup.setPhysSolid();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_withEnergyValueandSolidState);
        await Setup.setPhysLiquid();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_withEnergyValueandLiquidState);
    }

    async integrationAny(check1, check2) {
        await check1.click();
        await expect(check1).toBeChecked();
        await this.stackLoop_Functionality();
        await this.physLoop_Functionality();
        await check2.click();
        await expect(check2).toBeChecked();
        await this.stackLoop_Functionality();
        await this.physLoop_Functionality();
        await check1.click();
        await expect(check1).not.toBeChecked();
        await expect(check2).toBeChecked();
        await this.stackLoop_Functionality();
        await this.physLoop_Functionality();
        await check2.click();
        await expect(check2).not.toBeChecked();
    }

    async resultCheckLoop(dropdown, expectedChildrenMap) {
        let options = await dropdown.$$('option');
        for(let i = 0; i < options.length; i++) {
            await dropdown.selectByIndex(i);
            let selectedOption = await options[i].getText();
            await expect(Selectors.recipeList).toHaveChildren({ eq: expectedChildrenMap[selectedOption]});
        }
        await Setup.setStackAny;
    }

    async stackLoop_Functionality() {
        const stackDropdown = await Selectors.dropStack
        const stackOptions = await stackDropdown.$$('option');
        for (let i = 0; i < stackOptions.length; i++) {
            await stackDropdown.selectByIndex(i); 
            let selectedOption = await stackDropdown.getValue();
            let expectedOption = await stackOptions[i].getAttribute('value');
            await expect(selectedOption).toBe(expectedOption);
        }
        await Setup.setStackAny;
        await Setup.setPhysAny;
    } 

    async physLoop_Functionality() {
        const physDropdown = await Selectors.dropPhys
        const physOptions = await physDropdown.$$('option');
        for (let i = 0; i < physOptions.length; i++){
            await physDropdown.selectByIndex(i);
            let selectedOption = await physDropdown.getValue();
            let expectedOption = await physOptions[i].getAttribute('value');
            await expect(selectedOption).toBe(expectedOption);
        }
        await Setup.setStackAny;
        await Setup.setPhysAny;
    }

    async physLoop_ResultCheck() {
        const physDropdown = await Selectors.dropPhys
        const physOptions = await physDropdown.$$('option');
        for (let i = 0; i < physOptions.length; i++){
            await physDropdown.selectByIndex(i);
            let selectedOption = await physDropdown.getValue();
            if (selectedOption === '0') {
                await expect(Selectors.recipeList).toHaveChildren({ eq: 174 }); // any
            } else if (selectedOption === '1') {
                await expect(Selectors.recipeList).toHaveChildren({ eq: 159 }); // solid
            } else if (selectedOption === '2') {
                await expect(Selectors.recipeList).toHaveChildren({ eq: 15 }); // liquid
            }
           }
           await Setup.setPhysAny();
        }
   
}

export default new AdvFilters();