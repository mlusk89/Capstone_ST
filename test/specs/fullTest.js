
import Functions from '../pageobjects/function.setup.js'

describe('My capstone test application', () => {
        it('should test 4 components', async () => {
            
            await Functions.open()
            await Functions.codexDropdown()
            
        });
});
