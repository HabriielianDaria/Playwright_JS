export class BaseController {
  constructor(request) {
    this.request = request;
  }

  async post(url, data) {
    const response = await this.request.post(url, { data });
    return response;
  }

  async get(url) {
    const response = await this.request.get(url);
    return response;
  }
}