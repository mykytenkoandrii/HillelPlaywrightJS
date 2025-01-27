import { test, expect, Locator } from '@playwright/test';
import HomePage from '../../page-objects/pages/HomePage';
import SignInForm from '../../page-objects/pages/SignInForm';
import GaragePage from '../../page-objects/pages/GaragePage';

test.describe(("Setup user"), () => {
  let homePage: HomePage;
  let signInForm: SignInForm;
  let garagePage: GaragePage;

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
    garagePage = new GaragePage(page);
    
    await homePage.openPage();
  });

  test('Log in and save user data', async ({ page }) => {
    await homePage.clickSignInButton();
    await signInForm.inputEmailField(process.env.MAIN_USER_MAIL!);
    await signInForm.inputPasswordField(process.env.PASS!);
    await signInForm.clickLoginButton();
    await garagePage.checkGarageHeaderIsVisible();

    await page.context().storageState({path:'./test-data/states/userData.json'});
  });
});