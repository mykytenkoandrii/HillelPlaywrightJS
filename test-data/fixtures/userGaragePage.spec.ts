import { test as base } from '@playwright/test';
import GaragePage from '../../page-objects/pages/GaragePage';
import HomePage from '../../page-objects/pages/HomePage';
import SignInForm from '../../page-objects/pages/SignInForm';

let homePage: HomePage;
let signInForm: SignInForm;
let garagePage: GaragePage;

export const test = base.extend({
  garagePageAsMainUser: async ({page}, use) =>{
    let homePage = new HomePage(page);
    let signInForm = new SignInForm(page);
    let garagePage = new GaragePage(page);

    await garagePage.openPage();
    await homePage.clickSignInButton();
    await signInForm.inputEmailField(process.env.MAIN_USER_MAIL!);
    await signInForm.inputPasswordField(process.env.PASS!);
    await signInForm.clickLoginButton();
    await garagePage.checkGarageHeaderIsVisible();

    await page.context().storageState({path:'./test-data/states/mainUserData.json'});

    await use(garagePage);

    await garagePage.removeFirstCarInList();
  }
});