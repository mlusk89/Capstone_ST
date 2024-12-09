import Codex from '../pageobjects/codex.js'
import Setup from '../pageobjects/function.setup.js'
import Selectors from '../pageobjects/selectorSetup.js'


describe('My codex test application', () => {
    it('should test the codex dropdown menu', async () => {
        
        await Selectors.startup();
        await Codex.codexDropdown();
        
        
    });
});