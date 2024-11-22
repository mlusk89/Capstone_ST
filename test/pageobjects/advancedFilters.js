import { $ } from '@wdio/globals';
import Home from './baseURL.js';
import { expect } from '@wdio/globals'
import Setup from '../pageobjects/function.setup.js'

class AdvFilters extends Home {
    
    async filtersTest() {
        await Setup.btnDropCodex.click();
        await Setup.btnItems.click();
        await Setup.btnAdv.click();
        await this.stackLoop();
        
    }

    async stackLoop() {
        const stackDropdown = await Setup.dropStack
        const stackOptions = await stackDropdown.$$('option');
        for (let i = 0; i < stackOptions.length; i++) {
            await stackDropdown.selectByIndex(i); 
        }
    } 

}

export default new AdvFilters();