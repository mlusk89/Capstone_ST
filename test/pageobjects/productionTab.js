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
        await Setup.machinesTab.click(); // Turn off Converter option
        await expect(chkConverter).toBeDisplayed();
        await Setup.chkConverter.click();
        await expect(chkConverter).not.toBeChecked();
        await Setup.productionTab.click(); //back to test area
        await expect(btnProdItemDrop).toBeDisplayed();
        await Setup.btnProdItemDrop.click();
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
        await expect(Setup.addProductTable).toHaveChildren(3) //original and Add Product button + 1 new
        await this.addProductLoop();
        await expect(Setup.addProductTable).toHaveChildren(143)
        await Setup.clrProdLine.click();
        await expect(Setup.addProductTable).toHaveChildren(2) // Only orig and Add Product left
    }

    async ProductionTest_ItpField() {
        await Setup.btnCalc.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/production");
        await Setup.btnProdItemDrop.click();
        await Setup.prodItem1.click();
        await Setup.inputProdAmt.getSize('width');
        let prodInputWidth = await Setup.inputProdAmt.getSize('width');
        await Setup.inputProdAmt.click({ x: (Math.round(((prodInputWidth - 24) / 2) - 15)), y: -9 }); //box width - padding(12 on each side)/2 (because it starts from the center) - 15 to get to buttons
        await expect(Setup.inputProdAmt).toHaveValue("11") //default entry is 10 + up click = 11
        await Setup.inputProdAmt.click({ x: (Math.round(((prodInputWidth - 24) / 2) - 15)), y: 9 });
        await expect(Setup.inputProdAmt).toHaveValue("10");
        await Setup.inputProdAmt.setValue(30);
        await expect(Setup.inputError).not.toExist();
        await Setup.inputProdAmt.setValue(60000);
        await Setup.visResult.waitForDisplayed();
        await expect(Setup.inputError).toExist();

    }

    async ProductionTest_Integration(){
        await Setup.btnCalc.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/production");
        await Setup.machinesTab.click();
        await expect(Setup.chkConverter).toBeDisplayed();
        await Setup.chkConverter.click();
        await expect(Setup.chkConverter).not.toBeChecked();
        await Setup.productionTab.click();
        await expect(Setup.btnProdItemDrop).toBeDisplayed();
        await Setup.btnProdItemDrop.click();
        await this.integrationLoop();
    }



    async prodItems(items) {
        await Setup.itemDropdown.setValue(items);
    }

    async itemLoop() {
        for (let i = 0; i < Setup.productionItems.length; i++) {
            await this.prodItems(Setup.productionItems[i]);
            const text = await Setup.prodResult.getText();
            console.log(text);
            await expect(Setup.productionItems[i]) === text;
            console.log(Setup.productionItems[i]);
            await Setup.itemDropdown.clearValue();
        }
    }

    async integrationLoop() {
        for (let i = 0; i < Setup.productionItems.length; i++) {
            await this.prodItems(Setup.productionItems[i]);
            await Setup.prodItem1.click();
            await Setup.inputProdAmt.waitForDisplayed();
            await expect(Setup.minMaxDrop).toExist();
            await expect(Setup.inputProdAmt).toExist();
            await Setup.inputProdAmt.getSize('width');
            let prodInputWidth = await Setup.inputProdAmt.getSize('width');
            await Setup.inputProdAmt.click({ x: (Math.round(((prodInputWidth - 24) / 2) - 15)), y: -9 }); //box width - padding(12 on each side)/2 (because it starts from the center) - 15 to get to buttons
            await expect(Setup.inputProdAmt).toHaveValue("11") //default entry is 10 + up click = 11
            await Setup.inputProdAmt.click({ x: (Math.round(((prodInputWidth - 24) / 2) - 15)), y: 9 });
            await expect(Setup.inputProdAmt).toHaveValue("10");
            await Setup.inputProdAmt.setValue(30);
            await expect(Setup.inputError).not.toBeDisplayed();
            if (await Setup.inputError.isDisplayed()) {
                await Setup.machinesTab.click();
                await expect(Setup.chkConverter).toBeDisplayed();
                await Setup.chkConverter.click();
                await expect(Setup.chkConverter).toBeChecked();
                await Setup.productionTab.click();
                await expect(Setup.btnProdItemDrop).toBeDisplayed();
                await Setup.btnProdItemDrop.click();
                }
            await Setup.inputProdAmt.setValue(600000);
            await expect(Setup.inputError).toExist();
            await Setup.inputProdAmt.setValue(10);
            await Setup.minMaxDrop.click();
            await Setup.maxDrop.click();
            await expect(Setup.inputProdAmt).not.toBeDisplayed();
            await Setup.minMaxDrop.click();
            await Setup.minDrop.click();
            await expect(Setup.inputProdAmt).toExist();
            await Setup.btnProdItemDrop.click();
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