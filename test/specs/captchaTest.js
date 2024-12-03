
import Setup from '../pageobjects/function.setup.js'

describe('My captcha test application', () => {
        it('should test for captcha traps', async () => {
            
            await Setup.open()
            browser.setWindowSize(1000, 1000)
            await Setup.captchaDetector()
            //await Setup.searchLoop()
            
        });
});

