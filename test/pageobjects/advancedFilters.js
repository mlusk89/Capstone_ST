
import Home from './baseURL.js';
import { expect } from '@wdio/globals'
import Setup from '../pageobjects/function.setup.js'
import Selectors from '../pageobjects/selectorSetup.js'

class AdvFilters extends Home {
    
    async filtersOpenTest() {
        await Selectors.btnDropCodex.waitForDisplayed({ timeout: 5000 })
        await Selectors.btnDropCodex.click();
        await expect(Selectors.btnItems).toBeDisplayed();
        await Selectors.btnItems.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/codex/items");
        await Setup.openClose(Selectors.btnAdv, Selectors.chkRad); //element to open and sub element to verify if open or closed
    }
    async checkTest() {    
        await Selectors.btnAdv.click();
        await expect(Selectors.chkRad).toBeDisplayed();
        await Selectors.chkRad.click();
        await expect(Selectors.chkRad).toBeChecked();
        await Selectors.chkEnergy.click();
        await expect(Selectors.chkEnergy).toBeChecked();
        await Selectors.chkRad.click();
        await expect(Selectors.chkRad).not.toBeChecked();
        await Selectors.chkEnergy.click();
        await expect(Selectors.chkEnergy).not.toBeChecked();
    }
    async stackAndPhysDropdownTest() {
        await Setup.openClose(Selectors.dropStack, Selectors.stackFocus); //element to open and sub element to verify if open or closed
        await Setup.openClose(Selectors.dropPhys, Selectors.physSubEle);
        await this.stackLoop_Functionality();
        await this.physLoop_Functionality();
        await this.physLoop_ResultCheck();
        await this.stackLoop_ResultCheck();
    }
    async integrationTest() {
        await this.integrationAny(Selectors.chkRad, Selectors.chkEnergy); //element to open and sub element to verify if open or closed
        await this.integrationPhysState(Selectors.chkRad, Selectors.chkEnergy);
    }


    async integrationPhysState(check1, check2) {
        await check1.click();
        await expect(check1).toBeChecked();
        await Setup.setPhysAny();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_Radioactive);
        await Setup.setPhysLiquid();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_RadioactiveWithLiquidState);
        await Setup.setPhysSolid();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_RadioactiveWithSolidState);
        await Setup.setPhysAny();
        await check2.click();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_RadioactivewithEnergyValue);
        await Setup.setPhysSolid
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_RadioactiveWithEnergyValueandSolidState);
        await Setup.setPhysLiquid
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_RadioactiveWithEnergyValueandLiquidState);
        await Setup.setPhysAny();
        await check1.click();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_withEnergyValue);
        await Setup.setPhysSolid();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_withEnergyValueandSolidState);
        await Setup.setPhysLiquid();
        await this.resultCheckLoop(Selectors.dropStack, Setup.expectedChildrenMap_withEnergyValueandLiquidState);
    }

    async integrationAny(check1, check2) {
        await check1.click();
        await expect(check1).toBeChecked();
        await this.stackLoop_Functionality();
        await this.physLoop_Functionality();
        await check2.click();
        await expect(check2).toBeChecked();
        await this.stackLoop_Functionality();
        await this.physLoop_Functionality();
        await check1.click();
        await expect(check1).not.toBeChecked();
        await expect(check2).toBeChecked();
        await this.stackLoop_Functionality();
        await this.physLoop_Functionality();
        await check2.click();
        await expect(check2).not.toBeChecked();
    }

    async resultCheckLoop(dropdown, expectedChildrenMap) {
        let options = await dropdown.$$('option');
        for(let i = 0; i < options.length; i++) {
            await dropdown.selectByIndex(i);
            let selectedOption = await options[i].getAttribute('value');
            await expect(Selectors.recipeList).toHaveChildren({ eq: expectedChildrenMap[selectedOption]});
        }
        await Setup.setStackAny;
    }

    async stackLoop_Functionality() {
        const stackDropdown = await Selectors.dropStack
        const stackOptions = await stackDropdown.$$('option');
        for (let i = 0; i < stackOptions.length; i++) {
            await stackDropdown.selectByIndex(i); 
            let selectedOption = await stackDropdown.getValue();
            let expectedOption = await stackOptions[i].getAttribute('value');
            await expect(selectedOption).toBe(expectedOption);
        }
    } 

    async physLoop_Functionality() {
        const physDropdown = await Selectors.dropPhys
        const physOptions = await physDropdown.$$('option');
        for (let i = 0; i < physOptions.length; i++){
            await physDropdown.selectByIndex(i);
            let selectedOption = await physDropdown.getValue();
            let expectedOption = await physOptions[i].getAttribute('value');
            await expect(selectedOption).toBe(expectedOption);
        }
    }

    async physLoop_ResultCheck() {
        const physDropdown = await Selectors.dropPhys
        const physOptions = await physDropdown.$$('option');
        for (let i = 0; i < physOptions.length; i++){
            await physDropdown.selectByIndex(i);
            let selectedOption = await physDropdown.getValue();
            if (selectedOption === '0') {
                await expect(Selectors.recipeList).toHaveChildren({ eq: 174 }); // any
            } else if (selectedOption === '1') {
                await expect(Selectors.recipeList).toHaveChildren({ eq: 159 }); // solid
            } else if (selectedOption === '2') {
                await expect(Selectors.recipeList).toHaveChildren({ eq: 15 }); // liquid
            }
           }
           await Setup.setPhysAny();
        }

        async stackLoop_ResultCheck() {
            const stackDropdown = await Selectors.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 174 }); // any
                } else if (selectedOption === '1') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 16 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 62 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 56 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 27 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 13 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopRad() {
            const stackDropdown = await Selectors.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 11 }); // any
                } else if (selectedOption === '1') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 3 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 3 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 2 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 3 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopRadEnergy() {
            const stackDropdown = await Selectors.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 3 }); // any
                } else if (selectedOption === '1') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 3 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopEnergy() {
            const stackDropdown = await Selectors.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 26 }); // any
                } else if (selectedOption === '1') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 10 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 9 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 6 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 1 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopSolid() {
            const stackDropdown = await Selectors.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 159 }); // any
                } else if (selectedOption === '1') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 16 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 47 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 56 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 27 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 13 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopLiquid() {
            const stackDropdown = await Selectors.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 15 }); // any
                } else if (selectedOption === '1') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 15 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopRadSolid() {
            const stackDropdown = await Selectors.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 11 }); // any
                } else if (selectedOption === '1') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 3 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 3 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 2 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 3 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }
        
        async stackLoopRadLiquid() {
            const stackDropdown = await Selectors.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // any
                } else if (selectedOption === '1') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopRadEnergyLiquid() {
            const stackDropdown = await Selectors.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // any
                } else if (selectedOption === '1') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopRadEnergySolid() {
            const stackDropdown = await Selectors.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 3 }); // any
                } else if (selectedOption === '1') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 3 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopEnergyLiquid() {
            const stackDropdown = await Selectors.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 7 }); // any
                } else if (selectedOption === '1') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 7 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopEnergySolid() {
            const stackDropdown = await Selectors.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 19 }); // any
                } else if (selectedOption === '1') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 3 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 9 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 6 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Selectors.recipeList).toHaveChildren({ eq: 1 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }
   
}

export default new AdvFilters();