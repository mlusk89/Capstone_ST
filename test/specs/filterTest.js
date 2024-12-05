import Setup from '../pageobjects/function.setup.js'
import AdvFilters from '../pageobjects/advancedFilters.js'
import advancedFilters from '../pageobjects/advancedFilters.js';


describe('My advanced filters test application', () => {
    it('should test that the advanced filter options open and close properly', async () => {
        
        await Setup.open();
        await AdvFilters.filtersOpenTest();
        
    });

    it('should test that the checkboxes function properly', async () => {
        
        await AdvFilters.checkTest();
    })

    it('should test that the Stack Size and Physical State dropdowns function properly', async () => {
        
        await AdvFilters.stackAndPhysDropdownTest();
    })

    it('should test the integration of all previous components to ensure they work together', async () => {
        
        await AdvFilters.integrationTest();
    })

});