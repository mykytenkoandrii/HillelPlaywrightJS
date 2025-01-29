import { expect, Page, Locator } from '@playwright/test';
import { test } from '../test-data/fixtures/userGaragePage.spec'

test.describe(("Homework25 test cases with fixture"), () => {

  test.describe(('Garage page tests'), () => {
    test('Verify main user can add BMW X6', async ({ garagePageAsMainUser }) => {
      await garagePageAsMainUser.addCarWithInputData('BMW', 'X6', '11000');
      expect('BMW X6').toBe(await garagePageAsMainUser.getFirstCarTitleList());
    });

    test('Verify main user can add Fiat Ducato', async ({ garagePageAsMainUser }) => {
      await garagePageAsMainUser.addCarWithInputData('Fiat', 'Ducato', '11000');
      expect('Fiat Ducato').toBe(await garagePageAsMainUser.getFirstCarTitleList());
    });
  });
});