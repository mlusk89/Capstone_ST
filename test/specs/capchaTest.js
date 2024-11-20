
import Functions from '../pageobjects/function.setup.js'

describe('My capcha test application', () => {
        it('should test for capcha traps', async () => {
            
            await Functions.open()
            await Functions.capchaDetector()
            await Functions.searchLoop()
            
        });
});

