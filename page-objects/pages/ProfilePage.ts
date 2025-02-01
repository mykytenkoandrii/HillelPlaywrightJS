import { expect,Locator, Page } from '@playwright/test';

export default class SignInForm{
    readonly page: Page;
    readonly profileHeader : Locator;
    readonly profileLeftPanelButton : Locator;
    readonly userNameRow : Locator;

    constructor(page: Page){
        this.page = page;
        this.profileHeader = page.locator('//h1["Profile"]');
        this.profileLeftPanelButton = page.locator('.btn-sidebar.sidebar_btn.-profile');
        this.userNameRow = page.locator('p.profile_name');
    }
    //#region Actions
    async clickProfileLeftPanelButton(){
        await this.profileLeftPanelButton.click();
    }
    //#endregion

    //#region 
    async checkProfilepageLoaded(){
        await expect(this.profileHeader).toBeVisible();
        //await expect(this.page).toHaveURL('**/profile');
    }

    async checkUserNameProfile(expectedValue: string){
        await expect(this.userNameRow).toHaveText(expectedValue);
    }
    //#endregion
}