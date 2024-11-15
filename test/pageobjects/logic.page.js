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

    get btnDrop1() {
        return $('[ng-click="$select.toggle($event)"]');
    }

    get search() {
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

    items=["Alien Protein", "Bacon Agaric", "Petroleum Coke", "Plastic", "Somersloop", "Uranium"]

    async component1() {
        await this.btnCalc.click();
        await expect(browser.url("https://www.satisfactorytools.com/1.0/production"));
        
    }


   
  
    open () {
        return super.open('login');
    }
}

export default new LogicPage();
