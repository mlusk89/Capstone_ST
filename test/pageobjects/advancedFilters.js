
import Home from './baseURL.js';
import { expect } from '@wdio/globals'
import Setup from '../pageobjects/function.setup.js'

class AdvFilters extends Home {
    
    async filtersOpenTest() {
        await Setup.btnDropCodex.waitForDisplayed({ timeout: 5000 })
        await Setup.btnDropCodex.click();
        await expect(Setup.btnItems).toBeDisplayed();
        await Setup.btnItems.click();
        await expect(browser).toHaveUrl("https://www.satisfactorytools.com/1.0/codex/items");
        await Setup.openClose(Setup.btnAdv, Setup.chkRad); //element to open and sub element to verify if open or closed
    }
    async checkTest() {    
        await Setup.btnAdv.click();
        await expect(Setup.chkRad).toBeDisplayed();
        await Setup.chkRad.click();
        await expect(Setup.chkRad).toBeChecked();
        await Setup.chkEnergy.click();
        await expect(Setup.chkEnergy).toBeChecked();
        await Setup.chkRad.click();
        await expect(Setup.chkRad).not.toBeChecked();
        await Setup.chkEnergy.click();
        await expect(Setup.chkEnergy).not.toBeChecked();
    }
    async stackAndPhysDropdownTest() {
        await Setup.openClose(Setup.dropStack, Setup.stackFocus); //element to open and sub element to verify if open or closed
        await Setup.openClose(Setup.dropPhys, Setup.physSubEle);
        await this.stackLoop_Functionality();
        await this.physLoop_Functionality();
        await this.physLoop_ResultCheck();
        await this.stackLoop_ResultCheck();
    }
    async integrationTest() {
        await this.integrationAny(Setup.chkRad, Setup.chkEnergy); //element to open and sub element to verify if open or closed
        await this.integrationPhysState(Setup.chkRad, Setup.chkEnergy);
    }


    async integrationPhysState(check1, check2) {
        await check1.click();
        await expect(check1).toBeChecked();
        await this.stackLoopRad(); //stack size w/rad and any phys state
        await Setup.setPhysLiquid();
        await this.stackLoopRadLiquid(); //stack size w/rad and liquid state
        await Setup.setPhysSolid();
        await this.stackLoopRadSolid(); //stack size w/rad and solid state
        await Setup.setPhysAny();
        await check2.click();
        await this.stackLoopRadEnergy(); //stack size w/rad+energy and any phys state
        await Setup.setPhysSolid
        await this.stackLoopRadEnergySolid(); //stack size w/rad+energy and solid state
        await Setup.setPhysLiquid
        await this.stackLoopRadEnergyLiquid(); //stack size w/rad+energy and liquid state
        await Setup.setPhysAny();
        await check1.click();
        await this.stackLoopEnergy(); //stack size w/energy and any phys state
        await Setup.setPhysSolid();
        await this.stackLoopEnergySolid(); //stack size w/energy and solid state
        await Setup.setPhysLiquid();
        await this.stackLoopEnergyLiquid(); //stack size w/energy and liquid state
    }


    async stackLoop_Functionality() {
        const stackDropdown = await Setup.dropStack
        const stackOptions = await stackDropdown.$$('option');
        for (let i = 0; i < stackOptions.length; i++) {
            await stackDropdown.selectByIndex(i); 
            let selectedOption = await stackDropdown.getValue();
            let expectedOption = await stackOptions[i].getAttribute('value');
            await expect(selectedOption).toBe(expectedOption);
        }
    } 

    async physLoop_Functionality() {
        const physDropdown = await Setup.dropPhys
        const physOptions = await physDropdown.$$('option');
        for (let i = 0; i < physOptions.length; i++){
            await physDropdown.selectByIndex(i);
            let selectedOption = await physDropdown.getValue();
            let expectedOption = await physOptions[i].getAttribute('value');
            await expect(selectedOption).toBe(expectedOption);
        }
    }

    async physLoop_ResultCheck() {
        const physDropdown = await Setup.dropPhys
        const physOptions = await physDropdown.$$('option');
        for (let i = 0; i < physOptions.length; i++){
            await physDropdown.selectByIndex(i);
            let selectedOption = await physDropdown.getValue();
            if (selectedOption === '0') {
                await expect(Setup.recipeList).toHaveChildren({ eq: 174 }); // any
            } else if (selectedOption === '1') {
                await expect(Setup.recipeList).toHaveChildren({ eq: 159 }); // solid
            } else if (selectedOption === '2') {
                await expect(Setup.recipeList).toHaveChildren({ eq: 15 }); // liquid
            }
           }
           await Setup.setPhysAny();
        }

        async stackLoop_ResultCheck() {
            const stackDropdown = await Setup.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 174 }); // any
                } else if (selectedOption === '1') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 16 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 62 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 56 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 27 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 13 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopRad() {
            const stackDropdown = await Setup.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 11 }); // any
                } else if (selectedOption === '1') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 3 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 3 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 2 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 3 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopRadEnergy() {
            const stackDropdown = await Setup.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 3 }); // any
                } else if (selectedOption === '1') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 3 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopEnergy() {
            const stackDropdown = await Setup.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 26 }); // any
                } else if (selectedOption === '1') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 10 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 9 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 6 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 1 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopSolid() {
            const stackDropdown = await Setup.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 159 }); // any
                } else if (selectedOption === '1') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 16 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 47 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 56 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 27 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 13 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopLiquid() {
            const stackDropdown = await Setup.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 15 }); // any
                } else if (selectedOption === '1') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 15 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }




        async stackLoopRadSolid() {
            const stackDropdown = await Setup.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 11 }); // any
                } else if (selectedOption === '1') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 3 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 3 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 2 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 3 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }
        
        async stackLoopRadLiquid() {
            const stackDropdown = await Setup.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // any
                } else if (selectedOption === '1') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopRadEnergyLiquid() {
            const stackDropdown = await Setup.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // any
                } else if (selectedOption === '1') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopRadEnergySolid() {
            const stackDropdown = await Setup.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 3 }); // any
                } else if (selectedOption === '1') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 3 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopEnergyLiquid() {
            const stackDropdown = await Setup.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 7 }); // any
                } else if (selectedOption === '1') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 7 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 500
                }
            }
            await Setup.setStackAny();
        }

        async stackLoopEnergySolid() {
            const stackDropdown = await Setup.dropStack
            const stackOptions = await stackDropdown.$$('option');
            for (let i = 0; i < stackOptions.length; i++){
                await stackDropdown.selectByIndex(i);
                let selectedOption = await stackDropdown.getValue();
                if (selectedOption === '0') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 19 }); // any
                } else if (selectedOption === '1') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 0 }); // stack size 1
                } else if (selectedOption === '2') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 3 }); // stack size 50
                } else if (selectedOption === '3') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 9 }); // stack size 100
                } else if (selectedOption === '4') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 6 }); // stack size 200
                } else if (selectedOption === '5') {
                    await expect(Setup.recipeList).toHaveChildren({ eq: 1 }); // stack size 500
                }
            }
            await Setup.setStackAny();
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
   
}

export default new AdvFilters();