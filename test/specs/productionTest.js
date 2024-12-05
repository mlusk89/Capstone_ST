import Production from '../pageobjects/productionTab.js'
import Setup from '../pageobjects/function.setup.js'


describe('My production tab test application', () => {
    it('should open the item selection dropdown and test all entries within', async () => {
        
        await Setup.open();
        await Production.ProductionTest_ItemDropdown();
        
    });

    it('should open the items/min dropdown and test both entries within', async () => {

        await Production.ProductionTest_IpmDropdown();

    });

    it('should test the clone, delete, add, and remove functions', async () => {

        await Setup.open();
        await Production.ProductionTest_CRUD();

    });

    it('should test the field for the number of items to produce', async () => {

        await Setup.open();
        await Production.ProductionTest_ItpField();

    });

    it('should test the interactions between components', async () => {
        
        await Setup.open();
        await Production.ProductionTest_Integration();

    });

});
