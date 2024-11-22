import Setup from '../pageobjects/function.setup.js'
import AdvFilters from '../pageobjects/advancedFilters.js'


describe('My advanced filters test application', () => {
    it('should test all filter options', async () => {
        
        await Setup.open();
        await AdvFilters.filtersTest();
        
    });
});