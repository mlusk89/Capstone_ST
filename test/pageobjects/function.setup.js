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

    get recipeList(){
        return $('.recipe-list')
    }

    get chkRad() {
        return $('[ng-model="ctrl.filtersService.filter.onlyRadioactive"]')
    }

    get chkEnergy(){
        return $('[ng-model="ctrl.filtersService.filter.onlyWithEnergyValue"]')
    }

    get dropStack() {
        return $('select[ng-model="ctrl.filtersService.filter.stackSize"]');
    }

    get dropPhys() {
        return $('select[ng-model="ctrl.filtersService.filter.physicalState"]')
    }

    get physSolid() {
        return $('[value="solid"]')
    }

    get physLiquid() {
        return $('[value="liquid"]')
    }

    get physAny() {
        return $('[ng-repeat="option in ctrl.physicalStates"]:first-of-type')
    }

    get physSubEle() {
        return $('[value="solid"]')
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


    items=["Adaptive Control Unit", "AI Expansion Server", "AI Limiter", "Alclad Aluminum Sheet",
         "Alien DNA Capsule", "Alien Power Matrix", "Alien Protein", "Alumina Solution", 
         "Aluminum Casing", "Aluminum Ingot", "Aluminum Scrap", "Assembly Director System", 
         "Automated Wiring", "Ballistic Warp Drive", "Battery", "Bauxite", "Biochemical Sculptor", 
         "Biomass", "Black Powder", "Cable", "Caterium Ingot", "Caterium Ore", "Circuit Board", 
         "Cluster Nobelisk", "Coal", "Compacted Coal", "Computer", "Concrete", "Cooling System", 
         "Copper Ingot", "Copper Ore", "Copper Powder", "Copper Sheet", "Crude Oil", 
         "Crystal Oscillator", "Dark Matter Crystal", "Dark Matter Residue", "Diamonds", 
         "Dissolved Silica", "Electromagnetic Control Rod", "Empty Canister", "Empty Fluid Tank",
         "Encased Industrial Beam", "Encased Plutonium Cell", "Encased Uranium Cell", 
         "Excited Photonic Matter", "Explosive Rebar", "Fabric", "Ficsite Ingot", "Ficsite Trigon", 
         "Ficsonium", "Ficsonium Fuel Rod", "Fuel", "Fused Modular Frame", "Gas Filter", 
         "Gas Nobelisk", "Heat Sink", "Heavy Modular Frame", "Heavy Oil Residue", 
         "High-Speed Connector", "Homing Rifle Ammo", "Iodine-Infused Filter", "Ionized Fuel", 
         "Iron Ingot", "Iron Ore", "Iron Plate", "Iron Rebar", "Iron Rod", "Limestone", 
         "Liquid Biofuel", "Magnetic Field Generator", "Modular Engine", "Modular Frame", "Motor", 
         "Neural-Quantum Processor", "Nitric Acid", "Nitrogen Gas", "Nobelisk", "Non-Fissile Uranium",
         "Nuclear Pasta", "Nuke Nobelisk", "Packaged Alumina Solution", "Packaged Fuel",
         "Packaged Heavy Oil Residue", "Packaged Ionized Fuel", "Packaged Liquid Biofuel",
         "Packaged Nitric Acid", "Packaged Nitrogen Gas", "Packaged Oil", "Packaged Rocket Fuel", 
         "Packaged Sulfuric Acid", "Packaged Turbofuel", "Packaged Water", "Petroleum Coke", "Plastic", 
         "Plutonium Fuel Rod", "Plutonium Pellet", "Polymer Resin", "Portable Miner", "Power Shard", 
         "Pressure Conversion Cube", "Pulse Nobelisk", "Quartz Crystal", "Quickwire", 
         "Radio Control Unit", "Raw Quartz", "Reanimated SAM", "Reinforced Iron Plate", "Rifle Ammo", 
         "Rocket Fuel", "Rotor", "Rubber", "SAM Fluctuator", "Screw", "Shatter Rebar", "Silica", 
         "Singularity Cell", "Smart Plating", "Smokeless Powder", "Solid Biofuel", "Stator", 
         "Steel Beam", "Steel Ingot", "Steel Pipe", "Stun Rebar", "Sulfur", "Sulfuric Acid", 
         "Supercomputer", "Superposition Oscillator", "Thermal Propulsion Rocket", "Time Crystal", 
         "Turbo Motor", "Turbo Rifle Ammo", "Turbofuel", "Uranium", "Uranium Fuel Rod", 
         "Versatile Framework", "Water", "Wire"
       ]

   


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
    
    async openClose(element, subElement, isOpen = false, offset = { y: 15 }) {
        await element.click();
        await element.click();
        await element.click();
        await element.click(offset);

        if (isOpen) {
            await expect(subElement).toBeClickable();
        }
        else {
            await expect(subElement).not.toBeClickable();
        
        }
    }
   
  
    open () {
        return super.open('login');
    }
}

export default new Setup();
