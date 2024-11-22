import Production from '../pageobjects/productionTab.js'
import AdvFilters from '../pageobjects/advancedFilters.js'
import Codex from '../pageobjects/codex.js'
import Setup from '../pageobjects/function.setup.js'

describe('My capstone test application', () => {
        it('should test all components', async () => {
            
            await Setup.open();
            await Codex.codexDropdown();
            await AdvFilters.filtersTest();
            
        });
});
