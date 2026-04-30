import { expect } from '@playwright/test';

export async function expectCarCreated(response, expectedData) {
  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.data.carBrandId).toBe(expectedData.carBrandId);
  expect(body.data.carModelId).toBe(expectedData.carModelId);
  expect(body.data.mileage).toBe(expectedData.mileage);
}

export async function expectError(response, expectedStatus) {
  expect(response.status()).toBe(expectedStatus);
}