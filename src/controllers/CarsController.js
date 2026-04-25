import { BaseController } from './BaseController';

export class CarsController extends BaseController {
  async createCar(data) {
    return await this.post('/api/cars', data);
  }
}