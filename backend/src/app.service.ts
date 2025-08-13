// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: 'Welcome to the Job Management API!',
      status: 'running 🚀',
      docs: 'Coming soon!',
      endpoints: {
        jobs: '/jobs'
      }
    };
  }
}