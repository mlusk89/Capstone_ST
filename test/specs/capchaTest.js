
import LogicPage from '../pageobjects/logic.page.js'

describe('My capcha test application', () => {
        it('should test for capcha traps', async () => {
            
            await LogicPage.open()
            await LogicPage.capchaDetector()
            await LogicPage.searchLoop()
            
        });
});

