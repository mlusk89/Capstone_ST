import { $ } from '@wdio/globals';
import Home from './baseURL.js';
import { expect } from '@wdio/globals'
import Setup from '../pageobjects/function.setup.js'

class Production extends Home {
    async ProductionTest_ItemDropdown() {
        await Setup.btnCalc.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/production");
        await Setup.btnProdItemDrop.click();
        await Setup.prodItem1.click();
        await Setup.btnProdItemDrop.click();
        await Setup.minMaxDrop.click(); //something to click outside of the dropdown 
        await this.itemLoop();
    }

    async ProductionTest_IpmDropdown() {
        await Setup.btnCalc.click();
        await Setup.openClose(Setup.minMaxDrop, Setup.maxDrop);
        await Setup.minMaxDrop.click();
        await Setup.maxDrop.click();
        await expect(Setup.inputProdamt).not.toExist
    }   
     
    async ProductionTest_CRUD() {
        await Setup.btnCalc.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/production");
        await Setup.btnAddTab.click();
        await expect(Setup.unnamedFactoryTab).toExist();
        await this.addTabLoop();
        await expect(Setup.numberOfTabs).toHaveChildren(144); //subtract orig, plus, and summary = 141 unnamed tabs should exist
        await Setup.btnRmvTab.click();
        await expect(Setup.numberOfTabs).toHaveChildren(143);
        await this.rmvTabLoop();
        await expect(Setup.unnamedFactoryTab).not.toExist();
        await Setup.btnAddProd.click();
        // await expect(this.addedProducts).toBeElementsArrayOfSize(2)
        // await this.addProductLoop();
        // await expect(this.addedProducts).toBeElementsArrayOfSize(142)
        // await Setup.clrProdLine.click();
        // await expect(this.addedProducts).toBeElementsArrayOfSize(1)
    }

    async ProductionTest_ItpField() {
        await Setup.btnCalc.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/production");
        await Setup.inputProdAmt.getSize('width');
        let prodInputWidth = await Setup.inputProdAmt.getSize('width');
        await Setup.inputProdAmt.click({ x: (Math.round(((prodInputWidth - 24) / 2) - 15)), y: -9 }); //box width - padding(12 on each side)/2 (because it starts from the center) - 15 to get to buttons
        await expect(Setup.inputProdAmt).toHaveValue("11") //default entry is 10 + up click = 11
        await Setup.inputProdAmt.click({ x: (Math.round(((prodInputWidth - 24) / 2) - 15)), y: 9 });
        await expect(Setup.inputProdAmt).toHaveValue("10");

    }

    // async ProductionTest_Integration(){
    //     await Setup.btnCalc.click();
    //     await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/production");
    // }

    async itemsLoop() {
        const itemDropdown = await Setup.prodItems
        const itemOptions = await itemDropdown.$$('option');
        for (let i = 0; i < itemOptions.length; i++){
            await btnProdItemDrop.click();
            await expect(itemDropdown).toExist();
            await itemDropdown.selectByIndex(i);
            let selectedOption = await itemDropdown.getValue();
            let expectedOption = await itemOptions[i].getAttribute('value');
            await expect(selectedOption).toBe(expectedOption);
        }
    }

    async prodItems(items) {
        await Setup.itemDropdown.setValue(items);
    }

    async itemLoop() {
        for (let i = 0; i < Setup.prodItems1.length; i++) {
            
            await Setup.btnProdItemDrop.click();
            await this.prodItems(Setup.prodItems1[i])
            await Setup.itemDropdown.clearValue();
        }
    }

    async addTabLoop() {
        
        for (let i = 0; i < 140; i++) {
            await Setup.btnAddTab.click();
        }
    }

    async rmvTabLoop() {
        for (let i = 0; i < 140; i++) {
            await Setup.btnRmvTab.click();
        }
    }

    async addProductLoop() {
        for (let i = 0; i < 140; i++) {
            await Setup.btnAddProd.click();
        }
        const addedProducts = $$('[ng-click="ctrl.tab.addEmptyProduct()"]');
    }

}



export default new Production();