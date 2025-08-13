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
// //         const dbUrl = config.get('DATABASE_URL');
        
// //         // For local development with plain username/password
// //         if (!isProduction) {
// //           return {
// //             type: 'postgres',
// //             host: 'localhost',
// //             port: 5432,
// //             username: 'postgres',
// //             password: 'Ajay@123',
// //             database: 'job_management',
// //             entities: [__dirname + '/**/*.entity{.ts,.js}'],
// //             autoLoadEntities: true,
// //             synchronize: true,
// //             logging: config.get('DB_LOGGING') === 'true',
// //           };
// //         }

// //         // For Render production
// //         return {
// //           type: 'postgres',
// //           url: dbUrl,
// //           ssl: true,
// //           extra: {
// //             ssl: {
// //               rejectUnauthorized: false,
// //             },
// //           },
// //           entities: [__dirname + '/**/*.entity{.ts,.js}'],
// //           autoLoadEntities: true,
// //           synchronize: false,
// //           logging: config.get('DB_LOGGING') === 'true',
// //           migrations: [__dirname + '/migrations/*{.ts,.js}'],
// //           migrationsRun: true,
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
// import { Job } from './jobs/job.entity';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (config: ConfigService) => ({
//         type: 'postgres',
//         host: config.get('DB_HOST', 'localhost'),
//         port: config.get<number>('DB_PORT', 5432),
//         username: config.get('DB_USERNAME', 'postgres'),
//         password: config.get('DB_PASSWORD', 'Ajay@123'),
//         database: config.get('DB_NAME', 'job_management'),
//         entities: [Job],
//         synchronize: config.get('NODE_ENV') !== 'production',
//         logging: config.get('DB_LOGGING') === 'true',
//         ...(config.get('NODE_ENV') === 'production' && {
//           url: config.get('DATABASE_URL'),
//           ssl: { rejectUnauthorized: false },
//           migrations: ['dist/migrations/*.js'],
//           migrationsRun: true,
//         }),
//       }),
//       inject: [ConfigService],
//       dataSourceFactory: async (options) => {
//         const dataSource = new DataSource(options);
//         await dataSource.initialize();
//         return dataSource;
//       },
//     }),
//     JobsModule,
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsModule } from './jobs/jobs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Job } from './jobs/job.entity';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USERNAME', 'postgres'),
        password: config.get('DB_PASSWORD', 'Ajay@123'),
        database: config.get('DB_NAME', 'job_management'),
        entities: [Job],
        synchronize: config.get('NODE_ENV') !== 'production',
        logging: config.get('DB_LOGGING') === 'true',
        ...(config.get('NODE_ENV') === 'production' && {
          url: config.get('DATABASE_URL'),
          ssl: { rejectUnauthorized: false },
          migrations: ['dist/migrations/*.js'],
          migrationsRun: true,
        }),
        // Fix for case sensitivity
        entitySkipConstructor: true,
        extra: {
          application_name: 'job_management_api'
        }
      }),
      inject: [ConfigService],
      dataSourceFactory: async (options) => {
        const dataSource = new DataSource(options);
        await dataSource.initialize();
        return dataSource;
      },
    }),
    JobsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}