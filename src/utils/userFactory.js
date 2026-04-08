export function generateUser() {
  const timestamp = Date.now();

  return {
    name: 'Daria',
    lastName: 'Habriielian',
    email: `aqa-${timestamp}@test.com`,
    password: 'Password1',
  };
}