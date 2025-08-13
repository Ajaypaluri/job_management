// //now
// // import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// // import { InjectRepository } from '@nestjs/typeorm';
// // import { Repository, ILike, Raw } from 'typeorm';
// // import { Job } from './job.entity';
// // import { CreateJobDto } from './dto/create-job.dto';
// // import { UpdateJobDto } from './dto/update-job.dto';

// // @Injectable()
// // export class JobsService {
// //   constructor(
// //     @InjectRepository(Job)
// //     private readonly jobRepo: Repository<Job>,
// //   ) {}

// //   async create(createJobDto: CreateJobDto): Promise<Job> {
// //     try {
// //       const job = this.jobRepo.create(createJobDto);
// //       return await this.jobRepo.save(job);
// //     } catch (error) {
// //       throw new BadRequestException('Failed to create job');
// //     }
// //   }

// //   async findAll(filters: any = {}): Promise<Job[]> {
// //     const where: any = {};
    
// //     // Title filter
// //     if (filters.title) where.title = ILike(`%${filters.title}%`);
    
// //     // Location filter
// //     if (filters.location) where.location = ILike(`%${filters.location}%`);
    
// //     // Job Type filter
// //     if (filters.jobType) where.jobType = filters.jobType;
    
// //     // Salary Range filter - Improved version
// //     if (filters.minSalary || filters.maxSalary) {
// //       try {
// //         const min = filters.minSalary ? parseFloat(filters.minSalary) : null;
// //         const max = filters.maxSalary ? parseFloat(filters.maxSalary) : null;

// //         if ((min && isNaN(min)) || (max && isNaN(max))) {
// //           throw new BadRequestException('Salary values must be numbers');
// //         }

// //         where.salaryRange = Raw(alias => {
// //           const baseQuery = `CAST(REGEXP_REPLACE(${alias}, '[^0-9.]', '', 'g') AS FLOAT)`;
          
// //           let query = `(${baseQuery}`;
          
// //           if (min !== null && max !== null) {
// //             query += ` BETWEEN ${min} AND ${max}`;
// //           } else if (min !== null) {
// //             query += ` >= ${min}`;
// //           } else {
// //             query += ` <= ${max}`;
// //           }
          
// //           return query;
// //         });
// //       } catch (error) {
// //         throw new BadRequestException('Invalid salary filter parameters');
// //       }
// //     }
    
// //     // Experience filter
// //     if (filters.experience) where.experienceLevel = ILike(`%${filters.experience}%`);
    
// //     try {
// //       return await this.jobRepo.find({ where });
// //     } catch (error) {
// //       throw new BadRequestException('Failed to fetch jobs');
// //     }
// //   }

// //   async findOne(id: number): Promise<Job> {
// //     try {
// //       const job = await this.jobRepo.findOne({ where: { id } });
// //       if (!job) {
// //         throw new NotFoundException(`Job with ID ${id} not found`);
// //       }
// //       return job;
// //     } catch (error) {
// //       throw new BadRequestException('Invalid job ID');
// //     }
// //   }

// //   async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
// //     try {
// //       await this.jobRepo.update(id, updateJobDto);
// //       return await this.findOne(id);
// //     } catch (error) {
// //       throw new BadRequestException('Failed to update job');
// //     }
// //   }

// //   async remove(id: number): Promise<void> {
// //     try {
// //       const result = await this.jobRepo.delete(id);
// //       if (result.affected === 0) {
// //         throw new NotFoundException(`Job with ID ${id} not found`);
// //       }
// //     } catch (error) {
// //       throw new BadRequestException('Failed to delete job');
// //     }
// //   }
// // }

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
//       const job = this.jobRepository.create(createJobDto);
//       return await this.jobRepository.save(job);
//     } catch (error) {
//       this.logger.error(`Failed to create job: ${error.message}`);
//       throw new BadRequestException('Failed to create job');
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
      
//       // Text filters
//       if (filters.title) where.title = ILike(`%${filters.title}%`);
//       if (filters.location) where.location = ILike(`%${filters.location}%`);
//       if (filters.experience) where.experienceLevel = ILike(`%${filters.experience}%`);
      
//       // Exact match filter
//       if (filters.jobType) where.jobType = filters.jobType;

//       // Salary filter (for LPA format)
//       if (filters.minSalary !== undefined || filters.maxSalary !== undefined) {
//         const min = filters.minSalary ?? 0;
//         const max = filters.maxSalary ?? Number.MAX_SAFE_INTEGER;

//         where.salaryRange = Raw(alias => {
//           // Extract numeric value from "XLPA" format and compare
//           return `CAST(REGEXP_REPLACE(${alias}, '[^0-9.]', '', 'g') AS NUMERIC) BETWEEN ${min} AND ${max}`;
//         });
//       }

//       return await this.jobRepository.find({ where });
//     } catch (error) {
//       this.logger.error(`Failed to fetch jobs: ${error.message}`);
//       this.logger.error(`Query parameters: ${JSON.stringify(filters)}`);
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
//       throw new BadRequestException('Invalid job ID');
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
//       throw new BadRequestException('Failed to delete job');
//     }
//   }
// }

import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, Raw } from 'typeorm';
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
      // Validate salary format
      if (createJobDto.salaryRange && !/^\d+\s?LPA$/i.test(createJobDto.salaryRange)) {
        throw new Error('Salary must be in format "X LPA" (e.g., "10 LPA")');
      }

      const job = this.jobRepository.create(createJobDto);
      return await this.jobRepository.save(job);
    } catch (error) {
      this.logger.error(`Failed to create job: ${error.message}`);
      throw new BadRequestException(error.message || 'Failed to create job');
    }
  }

  async findAll(filters: {
    title?: string;
    location?: string;
    jobType?: string;
    minSalary?: number;
    maxSalary?: number;
    experience?: string;
  } = {}): Promise<Job[]> {
    try {
      const where: any = {};
      
      if (filters.title) where.title = ILike(`%${filters.title}%`);
      if (filters.location) where.location = ILike(`%${filters.location}%`);
      if (filters.experience) where.experienceLevel = ILike(`%${filters.experience}%`);
      if (filters.jobType) where.jobType = filters.jobType;

      if (filters.minSalary !== undefined || filters.maxSalary !== undefined) {
        const min = filters.minSalary ?? 0;
        const max = filters.maxSalary ?? Number.MAX_SAFE_INTEGER;

        where.salaryRange = Raw(alias => {
          return `CAST(REGEXP_REPLACE(${alias}, '[^0-9.]', '', 'g') AS NUMERIC) BETWEEN ${min} AND ${max}`;
        });
      }

      const jobs = await this.jobRepository.find({ where });
      
      if (jobs.length === 0) {
        this.logger.warn('No jobs found with the given filters');
      }
      
      return jobs;
    } catch (error) {
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
    } catch (error) {
      this.logger.error(`Failed to find job ${id}: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    try {
      await this.jobRepository.update(id, updateJobDto);
      return this.findOne(id);
    } catch (error) {
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
    } catch (error) {
      this.logger.error(`Failed to delete job ${id}: ${error.message}`);
      throw error;
    }
  }
}