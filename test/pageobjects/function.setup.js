import { $ } from '@wdio/globals';
import Home from './baseURL.js';
import { expect } from '@wdio/globals'
import Selectors from '../pageobjects/selectorSetup.js'

class Setup extends Home {

    

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
        await Selectors.dropPhys.click();
        await Selectors.physAny.click();
    }

    async setPhysLiquid() {
        await Selectors.dropPhys.click();
        await Selectors.physLiquid.click();
    }

    async setPhysSolid() {
        await Selectors.dropPhys.click();
        await Selectors.physSolid.click();
    }

    async setStackAny() {
        await Selectors.dropStack.click();
        await Selectors.stackAny.click();
    }

    expectedChildrenMap_PhysicalState = {
        "any" : 175,
        "Solid" : 159,
        "Liquid" : 16
    }

    expectedChildrenMap_Any = {
        "any" : 175,
        "1" : 16,
        "50" : 62,
        "100" : 56,
        "200" : 27,
        "500" : 14
    };

    expectedChildrenMap_Radioactive = {
        "any" : 11,
        "1" : 0,
        "50" : 3,
        "100" : 3,
        "200" : 2,
        "500" : 3
    };

    expectedChildrenMap_RadioactivewithEnergyValue = {
        "any" : 3,
        "1" : 0,
        "50" : 3,
        "100" : 0,
        "200" : 0,
        "500" : 0
    }

    expectedChildrenMap_withEnergyValue = {
        "any" : 26,
        "1" : 0,
        "50" : 10,
        "100" : 9,
        "200" : 6,
        "500" : 1
    };

    expectedChildrenMap_LiquidState = {
        "any" : 15,
        "1" : 0,
        "2" : 15,
        "3" : 0,
        "4" : 0,
        "5" : 0
    };

    expectedChildrenMap_SolidState = {
        "any" : 159,
        "1" : 16,
        "50" : 47,
        "100" : 56,
        "200" : 27,
        "500" : 13
    };

    expectedChildrenMap_RadioactiveWithLiquidState = {
        "any" : 0,
        "1" : 0,
        "50" : 0,
        "100" : 0,
        "200" : 0,
        "500" : 0
    };

    expectedChildrenMap_RadioactiveWithSolidState = {
        "any" : 11,
        "1" : 0,
        "50" : 3,
        "100" : 3,
        "200" : 2,
        "500" : 3
    };

    expectedChildrenMap_RadioactiveWithEnergyValueandLiquidState = {
        "any" : 0,
        "1" : 0,
        "50" : 0,
        "100" : 0,
        "200" : 0,
        "500" : 0
    }

    expectedChildrenMap_RadioactiveWithEnergyValueandSolidState = {
        "any" : 3,
        "1" : 0,
        "50" : 3,
        "100" : 0,
        "200" : 0,
        "500" : 0
    };

    expectedChildrenMap_withEnergyValueandLiquidState = {
        "any" : 7,
        "1" : 0,
        "50" : 7,
        "100" : 0,
        "200" : 0,
        "500" : 0
    };

    expectedChildrenMap_withEnergyValueandSolidState = {
        "any" : 19,
        "1" : 0,
        "50" : 3,
        "100" : 9,
        "200" : 6,
        "500" : 1
    };

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
    
}

export default new Setup();
