import { test, expect, Locator } from '@playwright/test';
import AuthController from '../page-objects/api-controllers/AuthController';
import CarsController from '../page-objects/api-controllers/CarsController';

test.describe(("Homework28 API test cases"), () => {
  let authController: AuthController;
  let carsController: CarsController;
  let sid;

  test.beforeAll(async ({request}) => {
    authController = new AuthController(request);
    sid = await authController.signInAndGetCookies(process.env.MAIN_USER_MAIL!, process.env.PASS!)
  });

  test.beforeEach(async ({request})=> {
    authController = new AuthController(request);
    carsController = new CarsController(request);
  })

  test('001-Check add car request [/cars] with input data - Porsche Panamera', async() => {
    const response = await carsController.addCarWithInputData(4, 18, 11000, sid);

    expect(response.data.brand).toBe('Porsche');
    expect(response.data.model).toBe('Panamera');
  });

  test('002-Check delete request [/car/id] - remove last added car', async() => {
    const response = await carsController.getUserCars(sid);
    const lastCarId = response.data[0].id;

    const deleteResponse = await carsController.deleteCarWithId(lastCarId, sid);
    expect(deleteResponse.status).toBe("ok");
    expect(deleteResponse.data.carId).toBe(lastCarId);
  });

  test('003-Impossible to create car with invalid model [/cars]', async() => {
    const response = await carsController.addCarWithInputData(4, 0, 22344, sid);

    expect(response.message).toBe('Model not found');
  });

  test('004-Impossible to create car with invalid brand', async() => {
    const response = await carsController.addCarWithInputData(0, 18, 1111, sid);

    expect(response.message).toBe('Brand not found');
  });

  test('004-Impossible to create car with invalid mileage', async() => {
    const response = await carsController.addCarWithInputData(3, 12, -1, sid);

    expect(response.message).toBe('Mileage has to be from 0 to 999999');
  });
});