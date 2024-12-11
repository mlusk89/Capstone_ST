
import Home from './baseURL.js';
import { expect } from '@wdio/globals'
import Setup from '../pageobjects/function.setup.js'
import Selectors from '../pageobjects/selectorSetup.js'

class Production extends Home {
    async ProductionTest_ItemDropdown() {
        await Selectors.btnCalc.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/production");
        await Selectors.btnProdItemDrop.click();
        await Selectors.prodItem1.click();
        await Selectors.btnProdItemDrop.click();
        await Selectors.minMaxDrop.click(); //something to click outside of the dropdown 
        await expect(Selectors.btnProdItemDrop).toBeDisplayed();
        await Selectors.btnProdItemDrop.click();
        await this.itemLoop();
    }

    async ProductionTest_IpmDropdown() {
        await Selectors.btnCalc.click();
        await Setup.openClose(Selectors.minMaxDrop, Selectors.maxDrop);
        await Selectors.minMaxDrop.click();
        await Selectors.maxDrop.click();
        await expect(Selectors.inputProdamt).not.toExist
    }   
     
    async ProductionTest_CRUD() {
        await Selectors.btnCalc.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/production");
        await Selectors.btnAddTab.click();
        await expect(Selectors.unnamedFactoryTab).toExist();
        await this.addTabLoop(); 
        await expect(Selectors.numberOfTabs).toHaveChildren(144); //subtract orig, plus, and summary = 141 unnamed tabs should exist
        await Selectors.btnRmvTab.click();
        await expect(Selectors.numberOfTabs).toHaveChildren(143);
        await this.rmvTabLoop();
        await expect(Selectors.unnamedFactoryTab).not.toExist();
        await Selectors.btnAddProd.click();
        await expect(Selectors.addProductTable).toHaveChildren(3) //original and Add Product button + 1 new
        await this.addProductLoop();
        await expect(Selectors.addProductTable).toHaveChildren(143)
        await Selectors.clrProdLine.click();
        await expect(Selectors.addProductTable).toHaveChildren(2) // Only orig and Add Product left
    }

    async ProductionTest_ItpField() {
        await Selectors.btnCalc.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/production");
        await Selectors.btnProdItemDrop.click();
        await Selectors.prodItem1.click();
        await Selectors.inputProdAmt.getSize('width');
        let prodInputWidth = await Selectors.inputProdAmt.getSize('width');
        await Selectors.inputProdAmt.click({ x: (Math.round(((prodInputWidth - 24) / 2) - 15)), y: -9 }); //box width - padding(12 on each side)/2 (because it starts from the center) - 15 to get to buttons
        await expect(Selectors.inputProdAmt).toHaveValue("11") //default entry is 10 + up click = 11
        await Selectors.inputProdAmt.click({ x: (Math.round(((prodInputWidth - 24) / 2) - 15)), y: 9 });
        await expect(Selectors.inputProdAmt).toHaveValue("10");
        await Selectors.inputProdAmt.setValue(30); // number well within normal parameters
        await expect(Selectors.inputError).not.toExist();
        await Selectors.inputProdAmt.setValue(60000); // number well outside normal parameters
        await Selectors.visResult.waitForDisplayed();
        await expect(Selectors.inputError).toExist();
        await Selectors.inputProdAmt.setValue(10); // return to default

    }

    async ProductionTest_Integration(){
        await Selectors.btnCalc.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/production");
        await Selectors.machinesTab.click(); // turn off converter to avoid failure for outlier items
        await expect(Selectors.chkConverter).toBeDisplayed();
        await Selectors.chkConverter.click();
        await expect(Selectors.chkConverter).not.toBeChecked();
        await Selectors.productionTab.click();
        await expect(Selectors.btnProdItemDrop).toBeDisplayed();
        await Selectors.btnProdItemDrop.click();
        await this.integrationLoop();
    }



    async prodItems(items) {
        await Selectors.itemDropdown.setValue(items);
    }

    async itemLoop() {
        for (let i = 0; i < Setup.productionItems.length; i++) {
            await this.prodItems(Setup.productionItems[i]);
            const text = await Selectors.prodResult.getText();
            await expect(Setup.productionItems[i]) == text;
            await Selectors.itemDropdown.clearValue();
        }
    }

    async integrationLoop() {
        for (let i = 0; i < Setup.productionItems.length; i++) {
            await this.prodItems(Setup.productionItems[i]);
            await Selectors.prodItem1.click();
            await Selectors.inputProdAmt.waitForDisplayed();
            await expect(Selectors.minMaxDrop).toExist();
            await expect(Selectors.inputProdAmt).toExist();
            await Selectors.inputProdAmt.setValue(10); // assuring value is at default - test keeps tripping over itself
            await Selectors.inputProdAmt.getSize('width');
            let prodInputWidth = await Selectors.inputProdAmt.getSize('width');
            await Selectors.inputProdAmt.click({ x: (Math.round(((prodInputWidth - 24) / 2) - 15)), y: -9 }); //box width - padding(12 on each side)/2 (because it starts from the center) - 15 to get to buttons
            await expect(Selectors.inputProdAmt).toHaveValue("11") //default entry is 10 + up click = 11
            await Selectors.inputProdAmt.click({ x: (Math.round(((prodInputWidth - 24) / 2) - 15)), y: 9 });
            await expect(Selectors.inputProdAmt).toHaveValue("10");
            await Selectors.inputProdAmt.setValue(30); // well w/in normal parameters
            await expect(Selectors.inputError).not.toBeDisplayed();
            if (await Selectors.inputError.isDisplayed()) {
                await Selectors.machinesTab.click();
                await expect(Selectors.chkConverter).toBeDisplayed();
                await Selectors.chkConverter.click();
                await expect(Selectors.chkConverter).toBeChecked();
                await Selectors.productionTab.click();
                await expect(Selectors.btnProdItemDrop).toBeDisplayed();
                await Selectors.btnProdItemDrop.click();
                } 
                else if (await Selectors.inputError.isDisplayed()) {
                    let selectedOption = await Selectors.productionItems[i].getText();
                    while(selectedOption == "Ficsonium Fuel Rod")
                    await expect(Selectors.inputError).toBeDisplayed();
                }
            await Selectors.inputProdAmt.setValue(600000); // well outside normal parameters
            await expect(Selectors.inputError).toExist();
            await Selectors.inputProdAmt.setValue(10); // return to default
            await Selectors.minMaxDrop.click();
            await Selectors.maxDrop.click();
            await expect(Selectors.inputProdAmt).not.toBeDisplayed();
            await Selectors.minMaxDrop.click();
            await Selectors.minDrop.click();
            await expect(Selectors.inputProdAmt).toExist();
            await Selectors.btnProdItemDrop.click();
            await Selectors.itemDropdown.clearValue();
        }
    }

    async addTabLoop() {
        
        for (let i = 0; i < 140; i++) { // picked #, 140, because there are 139 listed items
            await Selectors.btnAddTab.click();
        }
    }

    async rmvTabLoop() {
        for (let i = 0; i < 140; i++) {
            await Selectors.btnRmvTab.click();
        }
    }

    async addProductLoop() {
        for (let i = 0; i < 140; i++) {
            await Selectors.btnAddProd.click();
        }
    }

}



export default new Production();