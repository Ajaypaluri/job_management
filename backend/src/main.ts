
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { Logger } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const logger = new Logger('Bootstrap');

//   // Enhanced CORS Configuration
//   app.enableCors({
//     origin: [
//       "https://job-management-frontend-ten.vercel.app",
//       "http://localhost:3000",
//       "http://localhost:3001"
//     ],
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//     credentials: true,
//     allowedHeaders: "Content-Type,Authorization,X-Requested-With",
//   });

//   // Set global prefix
//   // app.setGlobalPrefix('api');

//   const port = process.env.PORT || 3000;
//   await app.listen(port);

//   logger.log(`🚀 Server running on port ${port}`);
//   logger.log(`📊 Database connection established`);
//   logger.log(`🌐 API available at http://localhost:${port}/api`);
// }

// bootstrap().catch(err => {
//   new Logger('Bootstrap').error('Failed to start server', err);
//   process.exit(1);
// });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Enhanced CORS Configuration
  app.enableCors({
    origin: [
      "https://job-management-frontend-ten.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization,X-Requested-With",
  });

  // Verify database connection
  try {
    const dataSource = app.get(DataSource);
    await dataSource.query('SELECT 1');
    logger.log('✅ Database connection established');
  } catch (err) {
    logger.error('❌ Database connection failed', err);
    process.exit(1);
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 Server running on port ${port}`);
  logger.log(`🌐 API available at http://localhost:${port}`);
}

bootstrap().catch(err => {
  new Logger('Bootstrap').error('Failed to start server', err);
  process.exit(1);
});