import { Locator, Page } from '@playwright/test';

export default class AddCarForm{
    readonly page: Page;
    readonly addBrandDropdown : Locator;
    readonly addModelDropdown : Locator;
    readonly addMileageField : Locator;
    readonly addButton : Locator;

    constructor(page: Page){
        this.page = page;
        this.addBrandDropdown = page.locator('//select[@id="addCarBrand"]');
        this.addModelDropdown = page.locator('//select[@id="addCarModel"]');
        this.addMileageField = page.locator('#addCarMileage');
        this.addButton = page.locator('//button[text()="Add"]');
    }

    async selectCarBrand(car: string){
        await this.addBrandDropdown.selectOption(car);
    }

    async selectCarModel(model: string){
        await this.addModelDropdown.selectOption(model);
    }

    async inputMileage(mileage: string){
        await this.addMileageField.fill(mileage);
    }

    async clickAddButton(){
        await this.addButton.click();
    }
}