import { test, expect, Locator } from '@playwright/test';
import HomePage from '../page-objects/pages/HomePage';
import SignInForm from '../page-objects/pages/SignInForm';
import GaragePage from '../page-objects/pages/GaragePage';
import AddCarForm from '../page-objects/pages/AddCarForm';

test.describe(("Homework25 test cases"), () => {
  test.use({storageState: './test-data/states/userData.json'});
  let homePage: HomePage;
  let signInForm: SignInForm;
  let garagePage: GaragePage;
  let addCarForm: AddCarForm;

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
    garagePage = new GaragePage(page);
    addCarForm = new AddCarForm(page);
    
    await garagePage.openPage();
  });

  test.afterEach(async ({page}) => {   
    garagePage = new GaragePage(page);
    await garagePage.removeFirstCarInList();
  });

  test.describe(('Garage page tests'), () => {
    test('Verify user can add Ford Sierra', async ({ page }) => {
      await garagePage.checkGarageHeaderIsVisible();
      await garagePage.addCarWithInputData('Ford', 'Sierra', '11000');
      await page.waitForTimeout(300);
      expect('Ford Sierra').toBe(await garagePage.getFirstCarTitleList());
    });

    test('Verify user can add Porsche Panamera', async ({ page }) => {
      await garagePage.checkGarageHeaderIsVisible();
      await garagePage.addCarWithInputData('Porsche', 'Panamera', '11000');
      await page.waitForTimeout(300);
      expect('Porsche Panamera').toBe(await garagePage.getFirstCarTitleList());
    });
  });
});