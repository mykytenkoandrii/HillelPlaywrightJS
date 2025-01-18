import { test, expect, Locator } from '@playwright/test';
import HomePage from '../page-objects/pages/HomePage';
import RegisterForm from '../page-objects/pages/RegisterForm';

test.describe(("Homework24 test cases"), () => {
  let homePage: HomePage;
  let registerForm: RegisterForm;

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    registerForm = new RegisterForm(page);
    await homePage.openPage();
    await homePage.clickSingUpPutton();
  });

  test.describe(('Field "Name" validations'), () => {
    test('Check "Name is required" empty field error', async ({ page }) => {
      await registerForm.inputNameField('');
      
      await expect(page.getByText('Name required')).toBeVisible();
    });

    test('Check "Name is invalid" incorrect input error', async ({ page }) => {      
      await registerForm.inputNameField('/#test');
      await expect(page.getByText('Name is invalid')).toBeVisible();

      await registerForm.inputNameField('test ');
      await expect(page.getByText('Name is invalid')).toBeVisible();

      await registerForm.inputNameField('вася');
      await expect(page.getByText('Name is invalid')).toBeVisible();
    });

    test('Check "Name has to be from 2 to 20 characters long" string lenght error', async ({ page }) => { 
      await registerForm.inputNameField('a');
      await expect(registerForm.nameLengthError).toBeVisible();

      await registerForm.inputNameField('thisistwentycharsdata');
      await expect(registerForm.nameLengthError).toBeVisible();
    });

    test('Check "Name" field error red border-color', async ({ page }) => {
      await registerForm.inputNameField('a');
      await expect(registerForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe(('Field "Last Name" validations'), () => {
    test('Check "Last Name is required" empty field validations', async ({ page }) => {
      await registerForm.inputLastNameField('');
      await expect(page.getByText('Last name required')).toBeVisible();
    });

    test('Check "Last name is invalid" incorrect input error', async ({ page }) => {
      
      await registerForm.inputLastNameField('/#test');
      await expect(page.getByText('Last name is invalid')).toBeVisible();

      await registerForm.inputLastNameField('te st');
      await expect(page.getByText('Last name is invalid')).toBeVisible();

      await registerForm.inputLastNameField('інпут');
      await expect(page.getByText('Last name is invalid')).toBeVisible();
    });

    test('Check "Last name has to be from 2 to 20 characters long" string lenght error', async ({ page }) => {
      await registerForm.inputLastNameField('a');
      await expect(registerForm.lastNameLengthError).toBeVisible();

      await registerForm.inputLastNameField('thisistwentycharsdata');
      await expect(registerForm.lastNameLengthError).toBeVisible();
    });

    test('Check "Last name" field error red border-color', async ({ page }) => {
      await registerForm.inputLastNameField('a');
      await expect(registerForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe(('Field "Email" validations'), () => {
    test(('Check "Email is required" error field validation'), async ({ page }) => {
      await registerForm.inputEmailField('');
      await expect(page.getByText('Email required')).toBeVisible();
    });

    test(('Check "Email is incorrect" error field validation'), async ({ page }) => {
      await registerForm.inputEmailField('test@');
      await expect(page.getByText('Email is incorrect')).toBeVisible();
    });

    test(('Check "Email" field error red border-color'), async ({ page }) => {
      await registerForm.inputEmailField('12345');
      await expect(registerForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe(('Field "Password" validations'), () => {
    test('Check "Password is required" empty field error', async ({ page }) => {
      await registerForm.inputPasswordField('')
      await expect(page.getByText('Password required')).toBeVisible();
    });

    test('Check "Password has to be from..." wrong password length errors', async ({ page }) => {
      await registerForm.inputPasswordField('!sSq&m1');
      await expect(registerForm.passwordLengthError).toBeVisible();

      await registerForm.inputPasswordField('!sSq&m1L2Xader$s');
      await expect(registerForm.passwordLengthError).toBeVisible();
    });
  });

  test.describe(('Field "Re-enter password" validations'), () => {
    test('Check "Re-enter password is required" empty field error', async ({page}) => {
      await registerForm.inputReEnterPassField('');
      await expect(page.getByText('Re-enter password required')).toBeVisible();
    });

    test('Check "Passwords do not match" field error', async ({page}) => {
      await registerForm.inputPasswordField('!sSq&m1L2Xader$s');
      await registerForm.inputReEnterPassField('!sSq&m1L2Xader$');

      await expect(page.getByText('Passwords do not match')).toBeVisible();
    });

    test('Check "Re-enter password" field error red border-color', async ({page}) => {      
      await registerForm.inputReEnterPassField('');
      await expect(registerForm.reEnterPassField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Registration process validations', () => {
    test('Check "Register" button is inactive if one field has invalid data', async ({page}) => {
      const input = 'autotest';

      registerForm.inputNameField(input);
      registerForm.inputLastNameField(input);
      registerForm.inputEmailField(`testdata+${input}@gmail.com`);
      registerForm.inputPasswordField('!sSq&m1L2Xader');
      registerForm.inputReEnterPassField('12345');

      expect(registerForm.registerButton).toBeDisabled();
    });

    test('Check Registration successfull process', async ({page}) => {
      const input = 'autotest';

      registerForm.inputNameField(input);
      await page.waitForTimeout(500);
      registerForm.inputLastNameField(input);
      await page.waitForTimeout(500);
      registerForm.inputEmailField(`testdata+${input}@gmail.com`);
      await page.waitForTimeout(500);
      registerForm.inputPasswordField('!sSq&m1L2Xader');
      await page.waitForTimeout(500);
      registerForm.inputPasswordField('!sSq&m1L2Xader');

      expect(registerForm.registerButton).toBeEnabled();
      
      registerForm.clickRegisterButton();

      await expect(page.getByText('You don’t have any cars in your garage')).toBeVisible();
    });
  });
});