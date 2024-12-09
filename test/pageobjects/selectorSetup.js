import { $ } from '@wdio/globals';
import Home from './baseURL.js';


class Selectors extends Home {

    //productionTab Selectors

    startup() {
        return super.startup('login');
    }

    get btnCalc() {
        return $('[href="/1.0/production"]');
    }

    get btnAddTab() {
        return $('[ng-click="ctrl.addEmptyTab();"]');
    }

    get btnRmvTab() {
        return $('[ng-click="ctrl.removeTab(ctrl.tab)"]');
    }

    get unnamedFactoryTab() {
        return $('[data-original-title="Unnamed Factory"]')
    }

    get numberOfTabs() {
        return $('[ng-model="ctrl.tabs"]') 
    }

    get addProductTable() {
        return $('[ng-model="ctrl.tab.data.request.production"]')
    }

    get clrProdLine() {
        return $('[ng-click="ctrl.tab.clearProducts()"]')
    }

    get machinesTab() {
        return $(`[ng-class="{active: ctrl.tab.tab === 'machines'}"]`);
    }

    get chkConverter() {
        return $('//span[contains(text(), \"Converter\")]')
    }

    get productionTab() {
        return $(`[ng-class="{active: ctrl.tab.tab === 'production'}"]`);
    }

    get btnProdItemDrop() {
        return $('[ng-model="product.item"]');
    }

    get clearProdItem() {
        return $('[aria-label="Select box clear"]');
    }

    get itemDropdown() {
        return $('[type="search"]');
    }

    get prodItems() {
        return $('[ng-bind="item.name"]') 
    }

    get btnItem1() {
        return $('[href="/1.0/codex/items/ai-limiter"]');
    }

    get prodItem1() {
        return $('.ui-select-choices-row-inner');
    }

    get prodResult() {
        return $("span.ng-binding[ng-bind='item.name']")
    }

    get minMaxDrop() {
        return $('[ng-show="product.item"]');
    }

    get minDrop() {
        return $('[label="items/min"]');
    }

    get maxDrop() {
        return $('[label="maximize"]');
    }

    get inputProdAmt() {
        return $('[ng-model="product.amount"]');
    }

    get inputError() {
        return $('//div[@class="visualization-result" and contains(text(), \"Unfortunately\")]')
    }

    get visResult() {
        return $('.visualization-result')
    }

    get btnAddProd() {
        return $('[ng-click="ctrl.tab.addEmptyProduct()"]');
    }

    //Codex Selectors

    get btnDropCodex() {
        return $('a#browser_toggle');
    }

    get btnItems() {
        return $('[href="/1.0/codex/items"]');
    }

    get btnItemsHi() {
        return $('.dropdown-item.active[ui-sref="items"]');
    }

    get btnBuildings() {
        return $('[ui-sref="buildings"]');
    }

    get btnBuildingsHi() {
        return $('.dropdown-item.active[ui-sref="buildings"]');
    }

    get btnSchema() {
        return $('[ui-sref="schematics"]');
    }

    get btnSchemaHi() {
        return $('.dropdown-item.active[ui-sref="schematics"]');
    }

    //advancedFilters Selectors

    get btnAdv() {
        return $('.btn.btn-secondary.ng-binding');
    }

    get recipeList() {
        return $('.recipe-list');
    }

    get chkRad() {
        return $('[ng-model="ctrl.filtersService.filter.onlyRadioactive"]');
    }

    get chkEnergy() {
        return $('[ng-model="ctrl.filtersService.filter.onlyWithEnergyValue"]');
    }

    get dropStack() {
        return $('select[ng-model="ctrl.filtersService.filter.stackSize"]');
    }

    get stackAny() {
        return $('[ng-repeat="option in ctrl.stackSizes"]:first-of-type');
    }

    get dropPhys() {
        return $('select[ng-model="ctrl.filtersService.filter.physicalState"]');
    }

    get physSolid() {
        return $('[value="solid"]');
    }

    get physLiquid() {
        return $('[value="liquid"]');
    }

    get physAny() {
        return $('[ng-repeat="option in ctrl.physicalStates"]:first-of-type');
    }

    get physSubEle() {
        return $('[value="solid"]');
    }

}

export default new Selectors();
