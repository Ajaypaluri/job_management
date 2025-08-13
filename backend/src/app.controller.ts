// // import { Controller, Get } from '@nestjs/common';
// // import { AppService } from './app.service';

// // @Controller()
// // export class AppController {
// //   constructor(private readonly appService: AppService) {}

// //   @Get()
// //   getHello(): string {
// //     return this.appService.getHello();
// //   }
// // }
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