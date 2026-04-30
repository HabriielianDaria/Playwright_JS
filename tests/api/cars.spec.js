import { test } from '@playwright/test';
import { CarsController } from '../../src/controllers/CarsController';
import { expectCarCreated, expectError } from '../../src/assertions/carsAssertions';

test.use({ storageState: 'storageState.json' });

test.describe('Cars API', () => {
  let carsController;

  test.beforeEach(async ({ request }) => {
    carsController = new CarsController(request);
  });

  test('Success: Create car', async () => {
    const carData = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 123,
    };

    const response = await carsController.createCar(carData);

    await expectCarCreated(response, carData);
  });

  test('Error: Create car without mileage', async () => {
    const response = await carsController.createCar({
      carBrandId: 1,
      carModelId: 1,
    });

    await expectError(response, 400);
  });

  test('Error: Create car with invalid model', async () => {
    const response = await carsController.createCar({
      carBrandId: 1,
      carModelId: 9999,
      mileage: 100,
    });

    await expectError(response, 404); // 🔥 виправлено
  });
});