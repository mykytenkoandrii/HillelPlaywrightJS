import { Locator, Page } from '@playwright/test';

export default class HomePage{
    readonly page: Page;
    readonly signUpButton : Locator;
    readonly signInButton : Locator;

    constructor(page: Page){
        this.page = page;
        this.signUpButton = page.locator('button.hero-descriptor_btn');
        this.signInButton = page.locator('button.header_signin');
    }

    async clickSingUpPutton(){
        await this.signUpButton.click();
    }

    async clickSignInButton(){
        await this.signInButton.click();
    }

    async openPage(){
        await this.page.goto('/');
    }
}