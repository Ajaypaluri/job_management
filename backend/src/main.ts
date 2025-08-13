// // import { NestFactory } from '@nestjs/core';
// // import { AppModule } from './app.module';

// // async function bootstrap() {
// //   const app = await NestFactory.create(AppModule);
// //   await app.listen(process.env.PORT ?? 3000);
// // }
// // bootstrap();
// import { ValidationPipe } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
//   await app.listen(3000);
// }
// bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: "http://localhost:3001", // your Next.js frontend port
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   });

//   await app.listen(3000);
// }
// bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Enable CORS for Next.js frontend (adjust if needed)
//   app.enableCors({
//     origin: [
//       "http://localhost:3001", // Next.js dev server
//       "http://localhost:3000", // Optional: Allow if frontend runs on 3000 later
//     ],
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//     credentials: true,
//     allowedHeaders: "Content-Type,Authorization",
//   });

//   await app.listen(3000); // Keep backend on 3000 (or change if needed)
//   console.log(`🚀 Backend running on http://localhost:${3000}`);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ===== (1) Configure CORS =====
  app.enableCors({
    origin: [
      "http://localhost:3001", // Next.js frontend
      "http://localhost:3000", // Optional (if frontend changes)
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
  });

  // ===== (2) Add Root Route =====
  app.getHttpAdapter().get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Welcome to the Job Management API!',
      status: 'running 🚀',
      docs: 'Coming soon!',
      endpoints: {
        jobs: '/jobs',
      },
    });
  });

  // ===== (3) Start Server =====
  await app.listen(3000);
  console.log(`🚀 Backend running on http://localhost:3000`);
}
bootstrap();