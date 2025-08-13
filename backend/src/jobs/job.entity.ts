// // import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// // @Entity()
// // export class Job {
// //   @PrimaryGeneratedColumn()
// //   id: number;

// //   @Column()
// //   title: string;

// //   @Column()
// //   description: string;

// //   @Column()
// //   location: string;

// //   @Column()
// //   company: string;

// //   @Column()
// //   employmentType: string; // e.g. 'Full-time', 'Part-time', 'Contract'

// //   @Column({ nullable: true })
// //   salaryRange: string; // e.g. '₹5L - ₹8L per annum'

// //   @Column()
// //   experienceLevel: string; // e.g. 'Fresher', 'Mid', 'Senior'

// //   @Column()
// //   skillsRequired: string; // comma-separated string or JSON

// //   @Column({ type: 'date' })
// //   postedDate: Date;

// //   @Column({ type: 'date', nullable: true })
// //   applicationDeadline: Date;

// //   @Column({ nullable: true })
// //   contactEmail: string;

// //   @Column({ nullable: true })
// //   contactPhone: string;
// // }

// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity('jobs')
// export class Job {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   title: string;

//   @Column()
//   companyName: string;

//   @Column()
//   location: string;

//   @Column({
//     type: 'enum',
//     enum: ['Full-time', 'Part-time', 'Contract', 'Internship']
//   })
//   jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

//   @Column()
//   salaryRange: string;

//   @Column({ type: 'text' })
//   description: string;

//   @Column({ type: 'text' })
//   requirements: string;

//   @Column({ type: 'text' })
//   responsibilities: string;

//   @Column({ type: 'date' })
//   applicationDeadline: Date;
// }

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'companyName', nullable: true })
  companyName?: string;

  @Column({ name: 'location' })
  location: string;

  @Column({ 
    name: 'jobType',
    type: 'enum',
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    nullable: true 
  })
  jobType?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

  @Column({ name: 'salaryRange', nullable: true })
  salaryRange?: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'requirements', type: 'text', nullable: true })
  requirements?: string;

  @Column({ name: 'responsibilities', type: 'text', nullable: true })
  responsibilities?: string;

  @Column({ name: 'applicationDeadline', type: 'timestamp', nullable: true })
  applicationDeadline?: Date;
}