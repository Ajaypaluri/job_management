// // //2
// // // import { Module } from '@nestjs/common';
// // // import { TypeOrmModule } from '@nestjs/typeorm';
// // // import { JobsModule } from './jobs/jobs.module';
// // // import { ConfigModule, ConfigService } from '@nestjs/config';

// // // @Module({
// // //   imports: [
// // //     ConfigModule.forRoot(), // Loads .env files
// // //     TypeOrmModule.forRootAsync({
// // //       imports: [ConfigModule],
// // //       useFactory: (config: ConfigService) => ({
// // //         type: 'postgres',
// // //         url: config.get('DATABASE_URL'), // From Render env vars
// // //         ssl: true, // Required for Render
// // //         extra: {
// // //           ssl: {
// // //             rejectUnauthorized: false, // Needed for Render's free tier
// // //           },
// // //         },
// // //         autoLoadEntities: true,
// // //         synchronize: true, // Disable in production later
// // //       }),
// // //       inject: [ConfigService],
// // //     }),
// // //     JobsModule,
// // //   ],
// // // })
// // // export class AppModule {}

// // import { Module } from '@nestjs/common';
// // import { TypeOrmModule } from '@nestjs/typeorm';
// // import { JobsModule } from './jobs/jobs.module';
// // import { ConfigModule, ConfigService } from '@nestjs/config';
// // import { DataSource } from 'typeorm';

// // @Module({
// //   imports: [
// //     ConfigModule.forRoot({
// //       isGlobal: true,
// //       envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
// //     }),
// //     TypeOrmModule.forRootAsync({
// //       imports: [ConfigModule],
// //       useFactory: (config: ConfigService) => {
// //         const isProduction = config.get('NODE_ENV') === 'production';
        
// //         return {
// //           type: 'postgres',
// //           url: config.get('DATABASE_URL'),
// //           ssl: isProduction,
// //           extra: isProduction ? {
// //             ssl: {
// //               rejectUnauthorized: false,
// //             },
// //           } : {},
// //           entities: [__dirname + '/**/*.entity{.ts,.js}'],
// //           autoLoadEntities: true,
// //           synchronize: !isProduction, // Disable in production
// //           logging: config.get('DB_LOGGING') === 'true',
// //           migrations: isProduction ? [__dirname + '/migrations/*{.ts,.js}'] : [],
// //           migrationsRun: isProduction,
// //         };
// //       },
// //       inject: [ConfigService],
// //       async dataSourceFactory(options) {
// //         if (!options) {
// //           throw new Error('No database options provided');
// //         }
// //         const dataSource = new DataSource(options);
// //         await dataSource.initialize();
// //         return dataSource;
// //       },
// //     }),
// //     JobsModule,
// //   ],
// // })
// // export class AppModule {}
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { JobsModule } from './jobs/jobs.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { DataSource } from 'typeorm';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (config: ConfigService) => {
//         const isProduction = config.get('NODE_ENV') === 'production';
//         const dbUrl = config.get('DATABASE_URL');
        
//         // For local development with plain username/password
//         if (!isProduction) {
//           return {
//             type: 'postgres',
//             host: 'localhost',
//             port: 5432,
//             username: 'postgres',
//             password: 'Ajay@123',
//             database: 'job_management',
//             entities: [__dirname + '/**/*.entity{.ts,.js}'],
//             autoLoadEntities: true,
//             synchronize: true,
//             logging: config.get('DB_LOGGING') === 'true',
//           };
//         }

//         // For Render production
//         return {
//           type: 'postgres',
//           url: dbUrl,
//           ssl: true,
//           extra: {
//             ssl: {
//               rejectUnauthorized: false,
//             },
//           },
//           entities: [__dirname + '/**/*.entity{.ts,.js}'],
//           autoLoadEntities: true,
//           synchronize: false,
//           logging: config.get('DB_LOGGING') === 'true',
//           migrations: [__dirname + '/migrations/*{.ts,.js}'],
//           migrationsRun: true,
//         };
//       },
//       inject: [ConfigService],
//       async dataSourceFactory(options) {
//         if (!options) {
//           throw new Error('No database options provided');
//         }
//         const dataSource = new DataSource(options);
//         await dataSource.initialize();
//         return dataSource;
//       },
//     }),
//     JobsModule,
//   ],
// })
// export class AppModule {}
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