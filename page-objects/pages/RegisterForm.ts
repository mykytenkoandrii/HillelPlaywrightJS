import { Locator, Page } from '@playwright/test';

export default class RegisterForm{
    readonly page: Page;
    readonly nameField : Locator;
    readonly nameLengthError : Locator;
    readonly lastNameLengthError : Locator;
    readonly passwordLengthError : Locator;
    readonly lastNameField : Locator;
    readonly emailField : Locator;
    readonly passwordField : Locator;
    readonly reEnterPassField : Locator;
    readonly registerButton : Locator;

    constructor(page: Page){
        this.page = page;
        this.nameField = page.locator('#signupName');
        this.nameLengthError = page.getByText('Name has to be from 2 to 20 characters long');
        this.lastNameLengthError = page.getByText('Last name has to be from 2 to 20 characters long');
        this.lastNameField = page.locator('#signupLastName');
        this.emailField = page.locator('#signupEmail');
        this.passwordField = page.locator('#signupPassword');
        this.passwordLengthError = page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        this.reEnterPassField = page.locator('#signupRepeatPassword');
        this.registerButton = page.locator('//*[text()="Register"]');
    }
    //#region Actions
    async inputNameField(input: string){
        await this.nameField.fill(input);
        await this.nameField.blur();
    }

    async inputLastNameField(input: string){
        await this.lastNameField.fill(input);
        await this.lastNameField.blur();
    }

    async inputEmailField(input: string){
        await this.emailField.fill(input);
        await this.emailField.blur();
    }

    async inputPasswordField(input: string){
        await this.passwordField.fill(input);
        await this.passwordField.blur();
    }

    async inputReEnterPassField(input: string){
        await this.reEnterPassField.fill(input);
        await this.reEnterPassField.blur();
    }

    async clickRegisterButton(){
        await this.registerButton.click();
    }
    //#endregion
}