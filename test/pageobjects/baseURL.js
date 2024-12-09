import { browser } from '@wdio/globals';

export default class Home {
    startup(){
        return browser.url('https://www.satisfactorytools.com/1.0/');
    }
}