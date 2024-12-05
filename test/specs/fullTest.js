import Production from '../pageobjects/productionTab.js'
import AdvFilters from '../pageobjects/advancedFilters.js'
import Codex from '../pageobjects/codex.js'
import Setup from '../pageobjects/function.setup.js'

describe('My capstone test application', () => {
        it('should test all components', async () => {
            
            await Setup.open();
            await AdvFilters.filtersOpenTest();
            await AdvFilters.checkTest();
            await AdvFilters.stackAndPhysDropdownTest();
            await AdvFilters.integrationTest();
            await Setup.open();
            await Codex.codexDropdown();
            await Setup.open();
            await Production.ProductionTest_ItemDropdown();
            await Production.ProductionTest_IpmDropdown();
            await Setup.open();
            await Production.ProductionTest_CRUD();
            await Setup.open();
            await Production.ProductionTest_ItpField();
            await Setup.open();
            await Production.ProductionTest_Integration();

        });
});
