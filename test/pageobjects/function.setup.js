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

    get btnItem1() {
        return $('[href="/1.0/codex/items/ai-limiter"]');
    }

 


    items = ["Adaptive Control Unit", "AI Expansion Server", "AI Limiter", "Alclad Aluminum Sheet",
        "Alien DNA Capsule", "Alien Power Matrix", "Alien Protein", "Alumina Solution",
        "Aluminum Casing", "Aluminum Ingot", "Aluminum Scrap", "Assembly Director System",
        "Automated Wiring", "Ballistic Warp Drive", "Battery", "Bauxite", "Biochemical Sculptor",
        "Biomass", "Black Powder", "Cable", "Caterium Ingot", "Caterium Ore", "Chainsaw", "Circuit Board",
        "Cluster Nobelisk", "Coal", "Compacted Coal", "Computer", "Concrete", "Cooling System",
        "Copper Ingot", "Copper Ore", "Copper Powder", "Copper Sheet", "Crude Oil",
        "Crystal Oscillator", "Dark Matter Crystal", "Dark Matter Residue", "Diamonds",
        "Dissolved Silica", "Electromagnetic Control Rod", "Empty Canister", "Empty Fluid Tank",
        "Encased Industrial Beam", "Encased Plutonium Cell", "Encased Uranium Cell",
        "Excited Photonic Matter", "Explosive Rebar", "Fabric", "Ficsite Ingot", "Ficsite Trigon",
        "Ficsonium", "Ficsonium Fuel Rod", "Fuel", "Fused Modular Frame", "Gas Filter",
        "Gas Nobelisk", "Golden Factory Cart", "Hatcher Remains", "Hazmat Suit", "Heat Sink", 
        "Heavy Modular Frame", "Heavy Oil Residue","High-Speed Connector", "Homing Rifle Ammo", "Hoverpack", 
        "Iodine-Infused Filter", "Ionized Fuel", "Iron Ingot", "Iron Ore", "Iron Plate", "Iron Rebar", 
        "Iron Rod", "Limestone", "Liquid Biofuel", "Magnetic Field Generator", "Medicinal Inhaler", 
        "Mercer Sphere","Modular Engine", "Modular Frame", "Motor", "Mycelia", "Neural-Quantum Processor", 
        "Nitric Acid", "Nitrogen Gas", "Nobelisk", "Nobelisk Detonator", "Non-Fissile Uranium", 
        "Nuclear Pasta", "Nuke Nobelisk", "Object Scanner", "Packaged Alumina Solution", "Packaged Fuel",
        "Packaged Heavy Oil Residue", "Packaged Ionized Fuel", "Packaged Liquid Biofuel",
        "Packaged Nitric Acid", "Packaged Nitrogen Gas", "Packaged Oil", "Packaged Rocket Fuel",
        "Packaged Sulfuric Acid", "Packaged Turbofuel", "Packaged Water", "Paleberry", "Parachute",
        "Petroleum Coke", "Plastic", "Plutonium Fuel Rod", "Plutonium Pellet", "Polymer Resin", 
        "Portable Miner", "Power Shard", "Pressure Conversion Cube", "Pulse Nobelisk", "Quartz Crystal",
        "Quickwire", "Radio Control Unit", "Raw Quartz", "Reanimated SAM", "Reinforced Iron Plate", 
        "Rifle Ammo", "Rocket Fuel", "Rotor", "Rubber", "SAM Fluctuator", "Screw", "Shatter Rebar", 
        "Silica", "Singularity Cell", "Smart Plating", "Smokeless Powder", "Solid Biofuel", 
        "Somersloop", "Spitter Remains", "Stator", "Steel Beam", "Steel Ingot", "Steel Pipe", 
        "Stinger Remains", "Stun Rebar", "Sulfur", "Sulfuric Acid", "Supercomputer", 
        "Superposition Oscillator", "Thermal Propulsion Rocket", "Time Crystal", "Turbo Motor", 
        "Turbo Rifle Ammo", "Turbofuel", "Uranium", "Uranium Fuel Rod", "Uraniuim Waste",
        "Versatile Framework", "Water", "Wire", "Wood", "Xeno-Basher", "Xeno-Zapper", 
        "Yellow Power Slug", "Zipline"
    ]

    productionItems = ["Adaptive Control Unit", "AI Expansion Server", "AI Limiter", "Alclad Aluminum Sheet", 
        "Alien DNA Capsule", "Alien Power Matrix", "Alien Protein", "Alumina Solution", "Aluminum Casing", 
        "Aluminum Ingot", "Aluminum Scrap", "Assembly Director System", "Automated Wiring", 
        "Ballistic Warp Drive", "Battery", "Bauxite", "Biochemical Sculptor", "Biomass", "Black Powder", 
        "Cable", "Caterium Ingot", "Caterium Ore", "Circuit Board", "Cluster Nobelisk", "Coal", 
        "Compacted Coal", "Computer", "Concrete", "Cooling System", "Copper Ingot", "Copper Ore", 
        "Copper Powder", "Copper Sheet", "Crude Oil", "Crystal Oscillator", "Dark Matter Crystal", 
        "Dark Matter Residue", "Diamonds", "Dissolved Silica", "Electromagnetic Control Rod", 
        "Empty Canister", "Empty Fluid Tank", "Encased Industrial Beam", "Encased Plutonium Cell", 
        "Encased Uranium Cell", "Excited Photonic Matter", "Explosive Rebar", "Fabric", "Ficsite Ingot", 
        "Ficsite Trigon", "Ficsonium", "Ficsonium Fuel Rod", "Fuel", "Fused Modular Frame", "Gas Filter", 
        "Gas Nobelisk", "Heat Sink", "Heavy Modular Frame", "Heavy Oil Residue", "High-Speed Connector", 
        "Homing Rifle Ammo", "Iodine-Infused Filter", "Ionized Fuel", "Iron Ingot", "Iron Ore", "Iron Plate", 
        "Iron Rebar", "Iron Rod", "Limestone", "Liquid Biofuel", "Magnetic Field Generator", "Modular Engine", 
        "Modular Frame", "Motor", "Neural-Quantum Processor", "Nitric Acid", "Nitrogen Gas", "Nobelisk", 
        "Non-Fissile Uranium", "Nuclear Pasta", "Nuke Nobelisk", "Packaged Alumina Solution", "Packaged Fuel", 
        "Packaged Heavy Oil Residue", "Packaged Ionized Fuel", "Packaged Liquid Biofuel", 
        "Packaged Nitric Acid", "Packaged Nitrogen Gas", "Packaged Oil", "Packaged Rocket Fuel", 
        "Packaged Sulfuric Acid", "Packaged Turbofuel", "Packaged Water", "Petroleum Coke", "Plastic", 
        "Plutonium Fuel Rod", "Plutonium Pellet", "Polymer Resin", "Portable Miner", "Power Shard", 
        "Pressure Conversion Cube", "Pulse Nobelisk", "Quartz Crystal", "Quickwire", "Radio Control Unit", 
        "Raw Quartz", "Reanimated SAM", "Reinforced Iron Plate", "Rifle Ammo", "Rocket Fuel", "Rotor", 
        "Rubber", "SAM Fluctuator", "Screw", "Shatter Rebar", "Silica", "Singularity Cell", "Smart Plating", 
        "Smokeless Powder", "Solid Biofuel", "Stator", "Steel Beam", "Steel Ingot", "Steel Pipe", 
        "Stun Rebar", "Sulfur", "Sulfuric Acid", "Supercomputer", "Superposition Oscillator", 
        "Thermal Propulsion Rocket", "Time Crystal", "Turbo Motor", "Turbo Rifle Ammo", "Turbofuel", 
        "Uranium", "Uranium Fuel Rod", "Versatile Framework", "Water", "Wire"
    ]


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

    async setPhysAny() {
        await this.dropPhys.click();
        await this.physAny.click();
    }

    async setPhysLiquid() {
        await this.dropPhys.click();
        await this.physLiquid.click();
    }

    async setPhysSolid() {
        await this.dropPhys.click();
        await this.physSolid.click();
    }

    async setStackAny() {
        await this.dropStack.click();
        await this.stackAny.click();
    }

    open() {
        return super.open('login');
    }
}

export default new Setup();
