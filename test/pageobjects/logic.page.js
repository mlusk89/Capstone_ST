import { $ } from '@wdio/globals';
import Page from './baseURL.js';
import { expect } from '@wdio/globals'

class LogicPage extends Page {
   
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

    get btnDropCodex() {
        return $('a#browser_toggle')
    }

    get btnItems() {
        return $('[href="/1.0/codex/items"]')
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
        "Bauxite", "Assembly Director System", "Alien Power Matrix", "Compacted Coal", "Computer"
    ]

    async capchaDetector() {
        await this.btnCalc.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/production");
        await this.btnRecipes.click();
        await this.btnAltAll.click();
        await this.btnAltNone.click();
        await this.btnBaseAll.click();
        await this.btnBaseNone.click();
        await this.btnAddTab.click();
        await this.btnRmvTab.click();
        await this.btnDropCodex.click();
        await this.btnItems.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/codex/items");
        await this.btnAdv.click();
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

   
  
    open () {
        return super.open('login');
    }
}

export default new LogicPage();
