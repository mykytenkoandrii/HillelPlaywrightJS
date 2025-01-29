import { Locator, Page } from '@playwright/test';

export default class SignInForm{
    readonly page: Page;
    readonly signInEmailField : Locator;
    readonly signInPasswordField : Locator;
    readonly loginButton : Locator;

    constructor(page: Page){
        this.page = page;
        this.signInEmailField = page.locator('#signinEmail');
        this.signInPasswordField = page.locator('#signinPassword');
        this.loginButton = page.locator('//button[contains(text(), "Login")]');
    }

    async inputEmailField(inputText: string){
        await this.signInEmailField.fill(inputText!);
    }

    async inputPasswordField(inputText: string){
        await this.signInPasswordField.fill(inputText);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }
}