import { test, expect, Locator } from '@playwright/test';
import { randomInt } from 'crypto';

test.describe(("Homework23 test cases"), () => {
  let signUpButton : Locator;
  let nameField : Locator;
  let nameLengthError : Locator;
  let lastNameLengthError : Locator;
  let passwordLengthError : Locator;
  let lastNameField : Locator;
  let emailField : Locator;
  let passwordField : Locator;
  let reEnterPassField : Locator;
  let registerButton : Locator;

  test.beforeEach(async ({page}) => {
    signUpButton = page.locator('button.hero-descriptor_btn');
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    await signUpButton.click();
  });

  test.describe(('Field "Name" validations'), () => {
    test('Check "Name is required" empty field error', async ({ page }) => {
      nameField = page.locator('#signupName');
      
      await nameField.click();
      await nameField.blur();
      
      await expect(page.getByText('Name required')).toBeVisible();
    });

    test('Check "Name is invalid" incorrect input error', async ({ page }) => {
      nameField = page.locator('#signupName');
      
      await nameField.fill('/#test');
      await nameField.blur();
      await expect(page.getByText('Name is invalid')).toBeVisible();

      await nameField.fill('test ');
      await nameField.blur();
      await expect(page.getByText('Name is invalid')).toBeVisible();

      await nameField.fill('вася');
      await nameField.blur();
      await expect(page.getByText('Name is invalid')).toBeVisible();
    });

    test('Check "Name has to be from 2 to 20 characters long" string lenght error', async ({ page }) => {
      nameField = page.locator('#signupName');
      nameLengthError = page.getByText('Name has to be from 2 to 20 characters long');
      await nameField.fill('a');
      await nameField.blur();
      await expect(nameLengthError).toBeVisible();

      await nameField.fill('thisistwentycharsdata');
      await nameField.blur();
      await expect(nameLengthError).toBeVisible();
    });

    test('Check "Name" field error red border-color', async ({ page }) => {
      nameField = page.locator('#signupName');
      nameLengthError = page.getByText('Name has to be from 2 to 20 characters long');
      
      await nameField.fill('a');
      await nameField.blur();
      await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe(('Field "Last Name" validations'), () => {
    test('Check "Last Name is required" empty field validations', async ({ page }) => {
      lastNameField = page.locator('#signupLastName');

      await lastNameField.click();
      await lastNameField.blur();

      await expect(page.getByText('Last name required')).toBeVisible();
    });

    test('Check "Last name is invalid" incorrect input error', async ({ page }) => {
      lastNameField = page.locator('#signupLastName');
      
      await lastNameField.fill('/#test');
      await lastNameField.blur();
      await expect(page.getByText('Last name is invalid')).toBeVisible();

      await lastNameField.fill('te st');
      await lastNameField.blur();
      await expect(page.getByText('Last name is invalid')).toBeVisible();

      await lastNameField.fill('інпут');
      await lastNameField.blur();
      await expect(page.getByText('Last name is invalid')).toBeVisible();
    });

    test('Check "Last name has to be from 2 to 20 characters long" string lenght error', async ({ page }) => {
      lastNameField = page.locator('#signupLastName');
      lastNameLengthError = page.getByText('Last name has to be from 2 to 20 characters long');

      await lastNameField.fill('a');
      await lastNameField.blur();
      await expect(lastNameLengthError).toBeVisible();

      await lastNameField.fill('thisistwentycharsdata');
      await lastNameField.blur();
      await expect(lastNameLengthError).toBeVisible();
    });

    test('Check "Last name" field error red border-color', async ({ page }) => {
      lastNameField = page.locator('#signupLastName');
      lastNameLengthError = page.getByText('Name has to be from 2 to 20 characters long');
      
      await lastNameField.fill('a');
      await lastNameField.blur();
      await expect(lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe(('Field "Email" validations'), () => {
    test(('Check "Email is required" error field validation'), async ({ page }) => {
      emailField = page.locator('#signupEmail');

      await emailField.focus();
      await emailField.blur();

      await expect(page.getByText('Email required')).toBeVisible();
    });

    test(('Check "Email is incorrect" error field validation'), async ({ page }) => {
      emailField = page.locator('#signupEmail');

      await emailField.fill('test@');
      await emailField.blur();

      await expect(page.getByText('Email is incorrect')).toBeVisible();
    });

    test(('Check "Email" field error red border-color'), async ({ page }) => {
      emailField = page.locator('#signupEmail');

      await emailField.fill('12345');
      await emailField.blur();

      await expect(emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe(('Field "Password" validations'), () => {
    test('Check "Password is required" empty field error', async ({ page }) => {
      passwordField = page.locator('#signupPassword');

      await passwordField.focus();
      await passwordField.blur();
      await expect(page.getByText('Password required')).toBeVisible();
    });

    test('Check "Password has to be from..." wrong password length errors', async ({ page }) => {
      passwordField = page.locator('#signupPassword');
      passwordLengthError = page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

      await passwordField.fill('!sSq&m1');
      await passwordField.blur();
      await expect(passwordLengthError).toBeVisible();

      await passwordField.fill('!sSq&m1L2Xader$s');
      await passwordField.blur();
      await expect(passwordLengthError).toBeVisible();
    });

    test('Check correct password length input values', async ({ page }) => {
      passwordField = page.locator('#signupPassword');
      passwordLengthError = page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

      await passwordField.fill('!sSq&m1L');
      await passwordField.blur();
      await expect(passwordLengthError).toHaveCount(0);

      await passwordField.fill('!sSq&m1L2Xader$');
      await passwordField.blur();
      await expect(passwordLengthError).toHaveCount(0);
    });

    test('Check "Password" field error red border-color', async ({ page }) => {
      passwordField = page.locator('#signupPassword');
      passwordLengthError = page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

      await passwordField.fill('QWERTY');
      await passwordField.blur();

      await expect(passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(passwordLengthError).toHaveCSS('color', 'rgb(220, 53, 69)');
    });
  });

  test.describe(('Field "Re-enter password" validations'), () => {
    test('Check "Re-enter password is required" empty field error', async ({page}) => {
      reEnterPassField = page.locator('#signupRepeatPassword');

      await reEnterPassField.focus();
      await reEnterPassField.blur();

      await expect(page.getByText('Re-enter password required')).toBeVisible();
    });

    test('Check "Passwords do not match" field error', async ({page}) => {
      passwordField = page.locator('#signupPassword');
      reEnterPassField = page.locator('#signupRepeatPassword');

      await passwordField.fill('!sSq&m1L2Xader$s');
      await reEnterPassField.fill('!sSq&m1L2Xader$');
      await reEnterPassField.blur();

      await expect(page.getByText('Passwords do not match')).toBeVisible();
    });

    test('Check "Re-enter password" field error red border-color', async ({page}) => {
      reEnterPassField = page.locator('#signupRepeatPassword');
      await reEnterPassField.focus();
      await reEnterPassField.blur();

      await expect(reEnterPassField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Registration process validations', async ({page}) => {
      const input = 'testuser';
      nameField = page.locator('#signupName');
      lastNameField = page.locator('#signupLastName');
      emailField = page.locator('#signupEmail');
      passwordField = page.locator('#signupPassword');
      reEnterPassField = page.locator('#signupRepeatPassword');
      registerButton = page.locator('//*[text()="Register"]');

      nameField.fill(input);
      lastNameField.fill(input);
      emailField.fill(`testdata+${input}@gmail.com`);
      passwordField.fill('!sSq&m1L2Xader');
      reEnterPassField.fill('12345');
      reEnterPassField.blur();

      expect(registerButton).toBeDisabled();
  });
  });

  test.describe('Registration process validations', () => {
    test('Check "Register" button is inactive if one field has invalid data', async ({page}) => {
      const input = 'testuser';
      nameField = page.locator('#signupName');
      lastNameField = page.locator('#signupLastName');
      emailField = page.locator('#signupEmail');
      passwordField = page.locator('#signupPassword');
      reEnterPassField = page.locator('#signupRepeatPassword');
      registerButton = page.locator('//*[text()="Register"]');

      nameField.fill(input);
      lastNameField.fill(input);
      emailField.fill(`testdata+${input}@gmail.com`);
      passwordField.fill('!sSq&m1L2Xader');
      reEnterPassField.fill('12345');
      reEnterPassField.blur();

      expect(registerButton).toBeDisabled();
    });

    test('Check Registration successfull process', async ({page}) => {
      const input = 'testuser';
      const randomInput = randomInt(10000);
      nameField = page.locator('#signupName');
      lastNameField = page.locator('#signupLastName');
      emailField = page.locator('#signupEmail');
      passwordField = page.locator('#signupPassword');
      reEnterPassField = page.locator('#signupRepeatPassword');
      registerButton = page.locator('//*[text()="Register"]');

      nameField.fill(input);
      await page.waitForTimeout(500);
      lastNameField.fill(input);
      await page.waitForTimeout(500);
      emailField.fill(`testdata+${randomInput}@gmail.com`);
      await page.waitForTimeout(500);
      passwordField.fill('!sSq&m1L2Xader');
      await page.waitForTimeout(500);
      reEnterPassField.fill('!sSq&m1L2Xader');
      reEnterPassField.blur();

      expect(registerButton).toBeEnabled();
      
      registerButton.click();

      await expect(page.getByText('You don’t have any cars in your garage')).toBeVisible();
    });
  });
});