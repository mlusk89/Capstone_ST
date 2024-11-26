import Codex from '../pageobjects/codex.js'
import Setup from '../pageobjects/function.setup.js'


describe('My codex test application', () => {
    it('should test the codex dropdown menu', async () => {
        
        await Setup.open();
        await Codex.codexDropdown();
        
        
    });
});