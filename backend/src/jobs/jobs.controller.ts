//now
// import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
// import { JobsService } from './jobs.service';
// import { CreateJobDto } from './dto/create-job.dto';
// import { UpdateJobDto } from './dto/update-job.dto';

// @Controller('jobs')
// export class JobsController {
//   constructor(private readonly jobsService: JobsService) {}

//   @Post()
//   create(@Body() createJobDto: CreateJobDto) {
//     return this.jobsService.create(createJobDto);
//   }

//   @Get()
//   findAll(
//     @Query('title') title?: string,
//     @Query('location') location?: string,
//     @Query('jobType') jobType?: string,
//     @Query('minSalary') minSalary?: string,
//     @Query('maxSalary') maxSalary?: string,
//     @Query('requirements') requirements?: string,
//     @Query('experience') experience?: string,
//   ) {
//     return this.jobsService.findAll({ 
//       title,
//       location,
//       jobType,
//       minSalary: minSalary ? parseFloat(minSalary) : undefined,
//       maxSalary: maxSalary ? parseFloat(maxSalary) : undefined,
//       requirements,
//       experience
//     });
//   }

//   @Get(':id')
//   findOne(@Param('id', ParseIntPipe) id: number) {
//     return this.jobsService.findOne(id);
//   }

//   @Put(':id')
//   update(@Param('id', ParseIntPipe) id: number, @Body() updateJobDto: UpdateJobDto) {
//     return this.jobsService.update(id, updateJobDto);
//   }

//   @Delete(':id')
//   remove(@Param('id', ParseIntPipe) id: number) {
//     return this.jobsService.remove(id);
//   }
// }

import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseFloatPipe, ParseIntPipe } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  async findAll(
    @Query('title') title?: string,
    @Query('location') location?: string,
    @Query('jobType') jobType?: string,
    @Query('minSalary', new ParseFloatPipe({ optional: true })) minSalary?: number,
    @Query('maxSalary', new ParseFloatPipe({ optional: true })) maxSalary?: number,
    @Query('experience') experience?: string,
  ) {
    return this.jobsService.findAll({
      title,
      location,
      jobType,
      minSalary,
      maxSalary,
      experience
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.remove(id);
  }
}