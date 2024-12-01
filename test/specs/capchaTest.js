
import Setup from '../pageobjects/function.setup.js'

describe('My capcha test application', () => {
        it('should test for capcha traps', async () => {
            
            await Setup.open()
            browser.setWindowSize(1000, 1000)
            await Setup.capchaDetector()
            //await Setup.searchLoop()
            
        });
});

