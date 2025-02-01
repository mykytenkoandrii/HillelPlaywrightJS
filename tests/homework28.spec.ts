import { test, expect, Locator } from '@playwright/test';
import HomePage from '../page-objects/pages/HomePage';
import GaragePage from '../page-objects/pages/GaragePage';
import ProfilePage from '../page-objects/pages/ProfilePage';

test.describe(("Homework28 test cases"), () => {
  test.use({storageState: './test-data/states/userData.json'});
  let homePage: HomePage;
  let garagePage: GaragePage;
  let profilePage: ProfilePage;

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    garagePage = new GaragePage(page);
    profilePage = new ProfilePage(page);
    
    await garagePage.openPage();
  });

  test('Verify user can intercept user profile name', async ({ page }) => {
    const responseBody = {
      "status": "ok",
      data: {
      "lastName": "тойво",
      "name": "Якийсь",
      "photoFilename": "default-user.png",
      "userId": 166285
      }
    }

    await page.route('**/api/users/profile', route => route.fulfill({
      status: 200,
      body: JSON.stringify(responseBody),
    }));

    await garagePage.openPage();
    await garagePage.checkGarageHeaderIsVisible();

    await profilePage.clickProfileLeftPanelButton();
    await profilePage.checkProfilepageLoaded();

    await profilePage.checkUserNameProfile('Якийсь тойво');
  });
});