import { Locator, Page } from '@playwright/test';

export default class HomePage{
    readonly page: Page;
    readonly signUpButton : Locator;

    constructor(page: Page){
        this.page = page;
        this.signUpButton = page.locator('button.hero-descriptor_btn');
    }

    async clickSingUpPutton(){
        await this.signUpButton.click();
    }

    async openPage(){
        await this.page.goto('/');
    }
}