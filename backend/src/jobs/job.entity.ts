
// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity('jobs')
// export class Job {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ name: 'title' })
//   title: string;

//   @Column({ name: 'companyName', nullable: true })
//   companyName?: string;

//   @Column({ name: 'location' })
//   location: string;

//   @Column({ 
//     name: 'jobType',
//     type: 'enum',
//     enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
//     nullable: true 
//   })
//   jobType?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

//   @Column({ name: 'salaryRange', nullable: true })
//   salaryRange?: string;

//   @Column({ name: 'description', type: 'text', nullable: true })
//   description?: string;

//   @Column({ name: 'requirements', type: 'text', nullable: true })
//   requirements?: string;

//   @Column({ name: 'responsibilities', type: 'text', nullable: true })
//   responsibilities?: string;

//   @Column({ name: 'applicationDeadline', type: 'timestamp', nullable: true })
//   applicationDeadline?: Date;
// }
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'title' })
  title!: string;

  @Column({ name: 'companyName', nullable: true })
  companyName?: string;

  @Column({ name: 'location' })
  location!: string;

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
