import { expect, Locator, Page } from '@playwright/test';
import AddCarForm from './AddCarForm';

export default class GaragePage{
    readonly page: Page;
    readonly addCarForm: AddCarForm;
    readonly garageHeader : Locator;
    readonly addCarButton : Locator;
    readonly firstCarTitle : Locator;
    readonly carList : Locator;

    constructor(page: Page){
        this.page = page;
        this.addCarForm = new AddCarForm(page);
        this.garageHeader = page.locator('//h1[text()="Garage"]');
        this.addCarButton = page.locator('//button[text()="Add car"]');
        this.firstCarTitle = page.locator('(//p[@class="car_name h2"])[1]');
        this.carList = page.locator('li.car-item');
    }
    //#region Actions
    async openPage(){
        await this.page.goto('/panel/garage');
    }
    async clickAddCarButton(){
        await this.addCarButton.click();
    }
    async addCarWithInputData(brand: string, model: string, mileage: string){
        await this.clickAddCarButton();
        await this.addCarForm.selectCarBrand(brand);
        await this.page.waitForTimeout(300);
        await this.addCarForm.selectCarModel(model);
        await this.page.waitForTimeout(300);
        await this.addCarForm.inputMileage(mileage);
        await this.page.waitForTimeout(300);
        await this.addCarForm.clickAddButton();
    }

    async removeFirstCarInList(){
        const firstCar = await this.carList.first();
        await firstCar.locator('.icon-edit').click();
        await this.page.locator('.btn.btn-outline-danger').click();
        await this.page.locator('.btn.btn-danger').click();
    }
    //#endregion

    //#region Varifications
    async checkGarageHeaderIsVisible(){
        await expect (this.garageHeader).toBeVisible();
    }

    async getFirstCarTitleList(): Promise<string>{
        await this.page.waitForTimeout(500);
        return await this.firstCarTitle.innerText();
    }
    //#endregion
}