// import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, ILike, Raw } from 'typeorm';
// import { Job } from './job.entity';
// import { CreateJobDto } from './dto/create-job.dto';
// import { UpdateJobDto } from './dto/update-job.dto';

// @Injectable()
// export class JobsService {
//   private readonly logger = new Logger(JobsService.name);

//   constructor(
//     @InjectRepository(Job)
//     private readonly jobRepository: Repository<Job>,
//   ) {}

//   async create(createJobDto: CreateJobDto): Promise<Job> {
//     try {
//       // Validate salary format
//       // if (createJobDto.salaryRange && !/^\d+\s?LPA$/i.test(createJobDto.salaryRange)) {
//       //   throw new Error('Salary must be in format "X LPA" (e.g., "10 LPA")');
//       // }

//       const job = this.jobRepository.create(createJobDto);
//       return await this.jobRepository.save(job);
//     } catch (error) {
//       this.logger.error(`Failed to create job: ${error.message}`);
//       throw new BadRequestException(error.message || 'Failed to create job');
//     }
//   }

//   async findAll(filters: {
//     title?: string;
//     location?: string;
//     jobType?: string;
//     minSalary?: number;
//     maxSalary?: number;
//     experience?: string;
//   } = {}): Promise<Job[]> {
//     try {
//       const where: any = {};
      
//       if (filters.title) where.title = ILike(`%${filters.title}%`);
//       if (filters.location) where.location = ILike(`%${filters.location}%`);
//       if (filters.experience) where.experienceLevel = ILike(`%${filters.experience}%`);
//       if (filters.jobType) where.jobType = filters.jobType;

//       if (filters.minSalary !== undefined || filters.maxSalary !== undefined) {
//         const min = filters.minSalary ?? 0;
//         const max = filters.maxSalary ?? Number.MAX_SAFE_INTEGER;

//         where.salaryRange = Raw(alias => {
//           return `CAST(REGEXP_REPLACE(${alias}, '[^0-9.]', '', 'g') AS NUMERIC) BETWEEN ${min} AND ${max}`;
//         });
//       }

//       const jobs = await this.jobRepository.find({ where });
      
//       if (jobs.length === 0) {
//         this.logger.warn('No jobs found with the given filters');
//       }
      
//       return jobs;
//     } catch (error) {
//       this.logger.error(`Failed to fetch jobs: ${error.message}`);
//       throw new BadRequestException('Failed to fetch jobs');
//     }
//   }

//   async findOne(id: number): Promise<Job> {
//     try {
//       const job = await this.jobRepository.findOne({ where: { id } });
//       if (!job) {
//         throw new NotFoundException(`Job with ID ${id} not found`);
//       }
//       return job;
//     } catch (error) {
//       this.logger.error(`Failed to find job ${id}: ${error.message}`);
//       throw error;
//     }
//   }

//   async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
//     try {
//       await this.jobRepository.update(id, updateJobDto);
//       return this.findOne(id);
//     } catch (error) {
//       this.logger.error(`Failed to update job ${id}: ${error.message}`);
//       throw new BadRequestException('Failed to update job');
//     }
//   }

//   async remove(id: number): Promise<void> {
//     try {
//       const result = await this.jobRepository.delete(id);
//       if (result.affected === 0) {
//         throw new NotFoundException(`Job with ID ${id} not found`);
//       }
//     } catch (error) {
//       this.logger.error(`Failed to delete job ${id}: ${error.message}`);
//       throw error;
//     }
//   }
// }

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, Raw, FindOptionsWhere } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    try {
      // Salary format validation removed for now
      const job = this.jobRepository.create(createJobDto);
      return await this.jobRepository.save(job);
    } catch (error: any) {
      this.logger.error(`Failed to create job: ${error.message}`);
      throw new BadRequestException(error.message || 'Failed to create job');
    }
  }

  // async findAll(filters: {
  //   title?: string;
  //   location?: string;
  //   jobType?: string;
  //   minSalary?: number;
  //   maxSalary?: number;
  //   experience?: string;
  // } = {}): Promise<Job[]> {
  //   try {
  //     const where: FindOptionsWhere<Job> = {};

  //     if (filters.title) where.title = ILike(`%${filters.title}%`);
  //     if (filters.location) where.location = ILike(`%${filters.location}%`);
  //     // if (filters.experience)
  //     //   where.experienceLevel = ILike(`%${filters.experience}%`);
  //     // if (filters.jobType) where.jobType = filters.jobType;
  //     if (filters.jobType) {
  //       where.jobType = filters.jobType as Job['jobType'];
  //     }
  //     // if (filters.minSalary !== undefined || filters.maxSalary !== undefined) {
  //     //   const min = filters.minSalary ?? 0;
  //     //   const max = filters.maxSalary ?? Number.MAX_SAFE_INTEGER;

  //     //   where.salaryRange = Raw((alias) => {
  //     //     return `(
  //     //       ${alias} IS NOT NULL AND ${alias} != '' AND
  //     //       (
  //     //         -- Case 1: Pure number (e.g., "10")
  //     //         (${alias} ~ '^[0-9]+$' AND CAST(${alias} AS NUMERIC) BETWEEN ${min} AND ${max})
  //     //         OR
  //     //         -- Case 2: Number with text (e.g., "10LPA" or "10 LPA")
  //     //         (${alias} ~ '^[0-9]+' AND 
  //     //         CAST(SUBSTRING(${alias} FROM '^([0-9]+)') AS NUMERIC) BETWEEN ${min} AND ${max})
  //     //       )
  //     //     )`;
  //     //   });
  //     // }




  //     if (
  //       filters.minSalary !== undefined ||
  //       filters.maxSalary !== undefined
  //     ) {
  //       const min = filters.minSalary ?? 0;
  //       const max = filters.maxSalary ?? Number.MAX_SAFE_INTEGER;

  //       where.salaryRange = Raw(
  //         (alias) =>
  //           `CAST(REGEXP_REPLACE(${alias}, '[^0-9.]', '', 'g') AS NUMERIC) BETWEEN ${min} AND ${max}`,
  //       );
  //     }

  //     const jobs = await this.jobRepository.find({ where });

  //     if (jobs.length === 0) {
  //       this.logger.warn('No jobs found with the given filters');
  //     }

  //     return jobs;
  //   } catch (error: any) {
  //     this.logger.error(`Failed to fetch jobs: ${error.message}`);
  //     throw new BadRequestException('Failed to fetch jobs');
  //   }
  // }
  async findAll(filters: {
  title?: string;
  location?: string;
  jobType?: string;
  minSalary?: number;
  maxSalary?: number;
  experience?: string;
} = {}): Promise<Job[]> {
  try {
    const where: FindOptionsWhere<Job> = {};

    if (filters.title) where.title = ILike(`%${filters.title}%`);
    if (filters.location) where.location = ILike(`%${filters.location}%`);
    if (filters.jobType) where.jobType = filters.jobType as Job['jobType'];

    if (filters.minSalary !== undefined || filters.maxSalary !== undefined) {
      const min = filters.minSalary ?? 0;
      const max = filters.maxSalary ?? Number.MAX_SAFE_INTEGER;

      // Safely filter numeric values inside salaryRange string
      where.salaryRange = Raw(
        (alias) =>
          `(${alias} IS NOT NULL AND ${alias} != '' AND
           CAST(REGEXP_REPLACE(${alias}, '[^0-9.]', '', 'g') AS NUMERIC)
           BETWEEN ${min} AND ${max})`,
      );
    }

    const jobs = await this.jobRepository.find({ where });

    if (jobs.length === 0) {
      this.logger.warn('No jobs found with the given filters');
    }

    return jobs;
  } catch (error: any) {
    this.logger.error(`Failed to fetch jobs: ${error.message}`);
    throw new BadRequestException('Failed to fetch jobs');
  }
}


  async findOne(id: number): Promise<Job> {
    try {
      const job = await this.jobRepository.findOne({ where: { id } });
      if (!job) {
        throw new NotFoundException(`Job with ID ${id} not found`);
      }
      return job;
    } catch (error: any) {
      this.logger.error(`Failed to find job ${id}: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    try {
      await this.jobRepository.update(id, updateJobDto);
      return this.findOne(id);
    } catch (error: any) {
      this.logger.error(`Failed to update job ${id}: ${error.message}`);
      throw new BadRequestException('Failed to update job');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.jobRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Job with ID ${id} not found`);
      }
    } catch (error: any) {
      this.logger.error(`Failed to delete job ${id}: ${error.message}`);
      throw error;
    }
  }
}
