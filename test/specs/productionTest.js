import Production from '../pageobjects/productionTab.js'
import Setup from '../pageobjects/function.setup.js'


describe('My production tab test application', () => {
    it('should test all production tab elements', async () => {
        
        await Setup.open();
        await Production.ProdTest();
        
    });
});