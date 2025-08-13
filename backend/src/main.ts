
// // import { ValidationPipe } from '@nestjs/common';
// // import { NestFactory } from '@nestjs/core';
// // import { AppModule } from './app.module';

// // async function bootstrap() {
// //   const app = await NestFactory.create(AppModule);
// //   app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
// //   await app.listen(3000);
// // }
// // bootstrap();

// // import { NestFactory } from '@nestjs/core';
// // import { AppModule } from './app.module';

// // async function bootstrap() {
// //   const app = await NestFactory.create(AppModule);

// //   // Enable CORS for Next.js frontend (adjust if needed)
// //   app.enableCors({
// //     origin: [
// //       "http://localhost:3001", // Next.js dev server
// //       "http://localhost:3000", // Optional: Allow if frontend runs on 3000 later
// //     ],
// //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
// //     credentials: true,
// //     allowedHeaders: "Content-Type,Authorization",
// //   });

// //   await app.listen(3000); // Keep backend on 3000 (or change if needed)
// //   console.log(`🚀 Backend running on http://localhost:${3000}`);
// // }
// // bootstrap();

// // import { NestFactory } from '@nestjs/core';
// // import { AppModule } from './app.module';
// // import { Request, Response } from 'express';

// // async function bootstrap() {
// //   const app = await NestFactory.create(AppModule);

// //   // ===== (1) Configure CORS =====
// //   app.enableCors({
// //     origin: [
// //       "http://localhost:3001", // Next.js frontend
// //       "http://localhost:3000", // Optional (if frontend changes)
// //     ],
// //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
// //     credentials: true,
// //     allowedHeaders: "Content-Type,Authorization",
// //   });

// //   // ===== (2) Add Root Route =====
// //   app.getHttpAdapter().get('/', (req: Request, res: Response) => {
// //     res.json({
// //       message: 'Welcome to the Job Management API!',
// //       status: 'running 🚀',
// //       docs: 'Coming soon!',
// //       endpoints: {
// //         jobs: '/jobs',
// //       },
// //     });
// //   });

// //   // ===== (3) Start Server =====
// //   await app.listen(3000);
// //   console.log(`🚀 Backend running on http://localhost:3000`);
// // }
// // bootstrap();
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { Request, Response } from 'express';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // ===== (1) Configure CORS =====
//   app.enableCors({
//     origin: [
//       "http://localhost:3001", // Next.js frontend
//       "http://localhost:3000", // Optional (if frontend changes)
//     ],
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//     credentials: true,
//     allowedHeaders: "Content-Type,Authorization",
//   });

//   // ===== (2) Add Root Route =====
//   app.getHttpAdapter().get('/', (req: Request, res: Response) => {
//     res.json({
//       message: 'Welcome to the Job Management API!',
//       status: 'running 🚀',
//       docs: 'Coming soon!',
//       endpoints: {
//         jobs: '/jobs',
//       },
//     });
//   });

//   // ===== (3) Start Server =====
//   const port = process.env.PORT || 3000; // Use PORT from env or fallback to 3000
//   await app.listen(port);
//   console.log(`🚀 Backend running on port ${port}`);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // ===== 1. Enhanced CORS Configuration =====
  app.enableCors({
    origin: [
      "https://job-management-frontend-ten.vercel.app", // Production frontend
      "http://localhost:3001", // Local development
      "https://job-management-frontend-*.vercel.app", // All preview deployments
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization,X-Requested-With",
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  // ===== 2. Health Check Endpoint =====
  app.getHttpAdapter().get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Job Management API Service',
      status: 'operational 🚀',
      version: '1.0',
      environment: process.env.NODE_ENV || 'development',
      endpoints: {
        jobs: {
          all: '/jobs',
          filtered: '/jobs?minSalary=X&maxSalary=Y'
        },
        documentation: 'Coming soon!'
      },
      timestamp: new Date().toISOString()
    });
  });

  // ===== 3. Server Startup =====
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); // Listen on all network interfaces
  logger.log(`🚀 Server running on port ${port}`);
  logger.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.log(`🛡️  CORS enabled for: ${["https://job-management-frontend-ten.vercel.app", "http://localhost:3001"].join(', ')}`);
}

bootstrap().catch(err => {
  new Logger('Bootstrap').error('Failed to start server', err.stack);
  process.exit(1);
});