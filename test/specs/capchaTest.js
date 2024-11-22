
import Setup from '../pageobjects/function.setup.js'

describe('My capcha test application', () => {
        it('should test for capcha traps', async () => {
            
            await Setup.open()
            await Setup.capchaDetector()
            await Setup.searchLoop()
            
        });
});

