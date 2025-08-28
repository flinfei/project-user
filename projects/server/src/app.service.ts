import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Nest.js API',
      version: '0.1.0',
    };
  }
}
