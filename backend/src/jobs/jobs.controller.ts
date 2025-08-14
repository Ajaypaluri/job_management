import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Body, 
  Query, 
  ParseFloatPipe, 
  ParseIntPipe, 
  HttpException, 
  HttpStatus,
  NotFoundException
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    try {
      return await this.jobsService.create(createJobDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
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
    try {
      return await this.jobsService.findAll({
        title,
        location,
        jobType,
        minSalary,
        maxSalary,
        experience
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.jobsService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateJobDto: UpdateJobDto) {
    try {
      return await this.jobsService.update(id, updateJobDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.jobsService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}