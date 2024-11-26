import { $ } from '@wdio/globals';
import Home from './baseURL.js';
import { expect } from '@wdio/globals'

class Setup extends Home {
   
    get btnCalc() {
        return $('[href="/1.0/production"]');
    }
    
    get btnAddTab() {
        return $('[ng-click="ctrl.addEmptyTab();"]');
    }

    get btnRmvTab() {
        return $('[ng-click="ctrl.removeTab(ctrl.tab)"]');
    }

    get btnProdItemDrop() {
        return $('[ng-click="$select.toggle($event)"]');
    }

    get prodItems() {
        return $('#ui-select-choices-row-3-1');
    }

    get prodItemsTemp(){
        return $('.ui-select-choices-row-inner')
    }

    get inputProdamt() {
        return $('[ng-model="product.amount"]')
    }

    get btnAddProd() {
        return $('[ng-click="ctrl.tab.addEmptyProduct()"]')
    }

    get btnDropCodex() {
        return $('a#browser_toggle')
    }

    get btnItems() {
        return $('[href="/1.0/codex/items"]')
    }

    get btnItemsHi() {
        return $('.dropdown-item.active[ui-sref="items"]')
    }

    get btnBuildings(){
        return $('[ui-sref="buildings"]')
    }

    get btnBuildingsHi(){
        return $('.dropdown-item.active[ui-sref="buildings"]')
    }

    get btnSchema(){
        return $('[ui-sref="schematics"]')
    }

    get btnSchemaHi(){
        return $('.dropdown-item.active[ui-sref="schematics"]')
    }

    get inputSearch() {
        return $('#queryInput');
    }

    get btnAdv() {
        return $('.btn.btn-secondary.ng-binding')
    }

    get chkRad() {
        return $('[ng-model="ctrl.filtersService.filter.onlyRadioactive"]')
    }

    get chkEnergy(){
        return $('[ng-model="ctrl.filtersService.filter.onlyWithEnergyValue"]')
    }

    get dropStack(){
        return $('select[ng-model="ctrl.filtersService.filter.stackSize"]');
    }

    get dropPhys(){
        return $('select[ng-model="ctrl.filtersService.filter.physicalState"]')
    }

    get btnItem1() {
        return $('[href="/1.0/codex/items/ai-limiter"]')
    }

    get btnRecipes() {
        return $(`[ng-click="ctrl.tab.tab = 'recipes'"]`)
    }

    get btnAltAll() {
        return $('[ng-click="ctrl.tab.setAllAlternateRecipes(true)"]')
    }

    get btnAltNone() {
        return $('[ng-click="ctrl.tab.setAllAlternateRecipes(false)"]')
    }

    get btnBaseAll() {
        return $('[ng-click="ctrl.tab.setAllBasicRecipes(true)"]')
    }

    get btnBaseNone() {
        return $('[ng-click="ctrl.tab.setAllBasicRecipes(false)"]')
    }

    get btnSearchX() {
        return $('.clear-filter.has-content')
    }


    items=["Alien Protein", "Bacon Agaric", "Petroleum Coke", "Plastic", "Somersloop", "Uranium",
        "Bauxite", "Assembly Director System", "Alien Power Matrix", "Compacted Coal", "Computer",
        "Superposition Oscillator", "Turbofuel", "Wire", "Wood", "Uranium"]

   


    async capchaDetector() {
        await this.btnCalc.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/production");
        await this.btnAddTab.click();
        await this.btnAddTab.click();
        await this.btnAddTab.click();
        await this.btnRmvTab.click();
        await this.btnProdItemDrop.click();
        await this.prodItemsTemp.click();
        await this.inputProdamt.click({x: 81, y: -9});
        await browser.pause(2000)
        await this.inputProdamt.click({x: 81, y: 9})
        await browser.pause(2000)
        await this.btnAddProd.click();
        await this.btnAddProd.click();
        await this.btnAddProd.click();
        await this.btnAddProd.click();
        await this.btnAddProd.click();
        await this.btnRecipes.click();
        await this.btnAltAll.click();
        await this.btnAltNone.click();
        await this.btnAltAll.click();
        await this.btnAltNone.click();
        await this.btnBaseAll.click();
        await this.btnBaseNone.click();
        await this.btnBaseAll.click();
        await this.btnBaseNone.click();
        await this.btnDropCodex.click();
        await this.btnItems.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/codex/items");
        await this.btnAdv.click();
        await this.chkRad.click();
        await this.chkRad.click();
    
    }
    
    async search(items) {
        await this.inputSearch.setValue(items);
    }

    async searchLoop() {
        for(let i = 0; i<this.items.length; i++){
            await this.search(this.items[i])
            await this.btnSearchX.click()
        }
    }
    
    async openClose(element, offset = { y: 15 }) {
        await element.click();
        await element.click();
        await element.click();
        await element.click(offset);
    }
   
  
    open () {
        return super.open('login');
    }
}

export default new Setup();
