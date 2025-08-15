
// import { Controller, Get } from '@nestjs/common';

// @Controller()
// export class AppController {
//   @Get()
//   getHello() {
//     return {
//       message: 'Job Management API',
//       status: 'running 🚀',
//       endpoints: {
//         jobs: '/jobs',
//         docs: 'Coming soon!'
//       }
//     };
//   }
// }
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
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