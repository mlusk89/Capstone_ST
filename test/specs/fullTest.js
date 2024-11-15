
import LogicPage from '../pageobjects/logic.page.js'

describe('My capstone test application', () => {
        it('should test 4 components', async () => {
            
            await LogicPage.open()
            await LogicPage.component1()
            
        });
});
