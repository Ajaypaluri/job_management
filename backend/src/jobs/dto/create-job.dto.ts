// // import { IsString, IsNumber, IsDateString, IsIn } from 'class-validator';

// // export class CreateJobDto {
// //   @IsString()
// //   title: string;

// //   @IsString()
// //   companyName: string;

// //   @IsString()
// //   location: string;

// //   @IsIn(['Full-time', 'Part-time', 'Contract', 'Internship'])
// //   jobType: string;

// //   @IsNumber()
// //   salaryMin: number;

// //   @IsNumber()
// //   salaryMax: number;

// //   @IsString()
// //   description: string;

// //   @IsString()
// //   requirements: string;

// //   @IsString()
// //   responsibilities: string;

// //   @IsDateString()
// //   applicationDeadline: Date;
// // }
// // export default CreateJobDto;

// import { IsString, IsEnum, IsDateString } from 'class-validator';

// export class CreateJobDto {
//   @IsString()
//   title: string;

//   @IsString()
//   companyName: string;

//   @IsString()
//   location: string;

//   @IsEnum(['Full-time', 'Part-time', 'Contract', 'Internship'], {
//     message: 'jobType must be one of the following values: Full-time, Part-time, Contract, Internship'
//   })
//   jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

//   @IsString()
//   salaryRange: string;

//   @IsString()
//   description: string;

//   @IsString()
//   requirements: string;

//   @IsString()
//   responsibilities: string;

//   @IsDateString()
//   applicationDeadline: string;
// }
import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateJobDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsIn(['Full-time', 'Part-time', 'Contract', 'Internship'])
  jobType?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

  @IsOptional()
  @IsString()
  salaryRange?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsOptional()
  @IsString()
  responsibilities?: string;

  @IsOptional()
  @IsString()
  applicationDeadline?: string;

  @IsOptional()
  @IsString()
  experience?: string;
}
