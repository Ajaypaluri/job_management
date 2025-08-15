
// // // import { Module } from '@nestjs/common';
// // // import { TypeOrmModule } from '@nestjs/typeorm';
// // // import { JobsModule } from './jobs/jobs.module';
// // // import { ConfigModule, ConfigService } from '@nestjs/config';
// // // import { Job } from './jobs/job.entity';
// // // import { AppController } from './app.controller';

// // // @Module({
// // //   imports: [
// // //     ConfigModule.forRoot({
// // //       isGlobal: true,
// // //       envFilePath: `.env.${process.env.NODE_ENV || 'production'}`,
// // //     }),
// // //     TypeOrmModule.forRootAsync({
// // //       imports: [ConfigModule],
// // //       useFactory: (config: ConfigService) => ({
// // //         type: 'postgres',
// // //         url: config.get('DATABASE_URL'), // Using the full connection URL
// // //         entities: [Job],
// // //         synchronize: false, // Critical for production
// // //         logging: true,
// // //         ssl: true, // Required for Render PostgreSQL
// // //         extra: {
// // //           ssl: {
// // //             rejectUnauthorized: false // Needed for Render's SSL
// // //           },
// // //           application_name: 'job_management_api',
// // //         },
// // //         migrations: ['dist/migrations/*.js'],
// // //         migrationsRun: true, // Auto-run migrations on startup
// // //       }),
// // //       inject: [ConfigService],
// // //     }),
// // //     JobsModule,
// // //   ],
// // //   controllers: [AppController],
// // //   providers: [],
// // // })
// // // export class AppModule {}

// // // import { Module } from '@nestjs/common';
// // // import { TypeOrmModule } from '@nestjs/typeorm';
// // // import { JobsModule } from './jobs/jobs.module';
// // // import { ConfigModule, ConfigService } from '@nestjs/config';
// // // import { Job } from './jobs/job.entity';
// // // import { AppController } from './app.controller';

// // // @Module({
// // //   imports: [
// // //     ConfigModule.forRoot({
// // //       isGlobal: true,
// // //       envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
// // //     }),
// // //     TypeOrmModule.forRootAsync({
// // //       imports: [ConfigModule],
// // //       useFactory: (config: ConfigService) => {
// // //         const isProduction = config.get('NODE_ENV') === 'production';

// // //         if (isProduction) {
// // //           return {
// // //             type: 'postgres',
// // //             url: config.get('DATABASE_URL'),
// // //             entities: [Job],
// // //             synchronize: true,
// // //             logging: config.get('DB_LOGGING') === 'true',
// // //             ssl: { rejectUnauthorized: false },
// // //             migrations: ['dist/migrations/*.js'],
// // //             migrationsRun: true,
// // //           };
// // //         }

// // //         return {
// // //           type: 'postgres',
// // //           host: config.get('DB_HOST', 'localhost'),
// // //           port: config.get<number>('DB_PORT', 5432),
// // //           username: config.get('DB_USERNAME', 'postgres'),
// // //           password: config.get('DB_PASSWORD', 'Ajay@123'),
// // //           database: config.get('DB_NAME', 'job_management'),
// // //           entities: [Job],
// // //           synchronize: true,
// // //           logging: config.get('DB_LOGGING') === 'true',
// // //         };
// // //       },
// // //       inject: [ConfigService],
// // //     }),
// // //     JobsModule,
// // //   ],
// // //   controllers: [AppController],
// // // })
// // // export class AppModule {}

// // import { Module } from '@nestjs/common';
// // import { TypeOrmModule } from '@nestjs/typeorm';
// // import { JobsModule } from './jobs/jobs.module';
// // import { ConfigModule, ConfigService } from '@nestjs/config';
// // import { Job } from './jobs/job.entity';

// // // NEW:
// // import { ServeStaticModule } from '@nestjs/serve-static';
// // import { join } from 'path';

// // @Module({
// //   imports: [
// //     // Serve the frontend static build
// //     ServeStaticModule.forRoot({
// //       rootPath: join(__dirname, '..', 'public'),
// //       exclude: ['/jobs*'], // ensure API routes are not swallowed by static serving
// //     }),

// //     ConfigModule.forRoot({
// //       isGlobal: true,
// //       envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
// //     }),

// //     TypeOrmModule.forRootAsync({
// //       imports: [ConfigModule],
// //       useFactory: (config: ConfigService) => {
// //         const isProduction = config.get('NODE_ENV') === 'production';
// //         if (isProduction) {
// //           return {
// //             type: 'postgres',
// //             url: config.get('DATABASE_URL'),
// //             entities: [Job],
// //             // keep synchronize *false* in real prod; enable temporarily if you must
// //             synchronize: true,
// //             logging: config.get('DB_LOGGING') === 'true',
// //             ssl: { rejectUnauthorized: false },
// //           };
// //         }
// //         return {
// //           type: 'postgres',
// //           host: config.get('DB_HOST', 'localhost'),
// //           port: config.get<number>('DB_PORT', 5432),
// //           username: config.get('DB_USERNAME', 'postgres'),
// //           password: config.get('DB_PASSWORD', 'Ajay@123'),
// //           database: config.get('DB_NAME', 'job_management'),
// //           entities: [Job],
// //           synchronize: true,
// //           logging: config.get('DB_LOGGING') === 'true',
// //         };
// //       },
// //       inject: [ConfigService],
// //     }),

// //     JobsModule,
// //   ],
// //   controllers: [], // IMPORTANT: remove AppController for "/" so the UI can load at root
// // })
// // export class AppModule {}

// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { JobsModule } from './jobs/jobs.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { Job } from './jobs/job.entity';

// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

// @Module({
//   imports: [
//     // Serve the frontend static build
//     ServeStaticModule.forRoot({
//       rootPath: join(__dirname, '..', 'public'),
//       exclude: ['/jobs*', '/api*'], // avoid API being caught by static serving
//     }),

//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
//     }),

//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (config: ConfigService) => {
//         const isProduction = config.get('NODE_ENV') === 'production';
//         if (isProduction) {
//           return {
//             type: 'postgres',
//             url: config.get('DATABASE_URL'),
//             entities: [Job],
//             synchronize: true, // set false for real production
//             logging: config.get('DB_LOGGING') === 'true',
//             ssl: { rejectUnauthorized: false },
//           };
//         }
//         return {
//           type: 'postgres',
//           host: config.get('DB_HOST', 'localhost'),
//           port: config.get<number>('DB_PORT', 5432),
//           username: config.get('DB_USERNAME', 'postgres'),
//           password: config.get('DB_PASSWORD', 'Ajay@123'),
//           database: config.get('DB_NAME', 'job_management'),
//           entities: [Job],
//           synchronize: true,
//           logging: config.get('DB_LOGGING') === 'true',
//         };
//       },
//       inject: [ConfigService],
//     }),

//     JobsModule,
//   ],
//   controllers: [],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsModule } from './jobs/jobs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Job } from './jobs/job.entity';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // Serve frontend static build from backend/client
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client','out'), // points to backend/client
      exclude: ['/jobs*', '/api*'], // avoid catching API routes
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const isProduction = config.get('NODE_ENV') === 'production';

        if (isProduction) {
          return {
            type: 'postgres',
            url: config.get('DATABASE_URL'),
            entities: [Job],
            synchronize: false, // keep false in real production
            logging: config.get('DB_LOGGING') === 'true',
            ssl: { rejectUnauthorized: false },
          };
        }

        return {
          type: 'postgres',
          host: config.get('DB_HOST', 'localhost'),
          port: config.get<number>('DB_PORT', 5432),
          username: config.get('DB_USERNAME', 'postgres'),
          password: config.get('DB_PASSWORD', 'Ajay@123'),
          database: config.get('DB_NAME', 'job_management'),
          entities: [Job],
          synchronize: true,
          logging: config.get('DB_LOGGING') === 'true',
        };
      },
      inject: [ConfigService],
    }),

    JobsModule,
  ],
  controllers: [],
})
export class AppModule {}
