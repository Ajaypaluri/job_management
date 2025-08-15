// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   Container, Paper, Text, Button, TextInput, Select, Group, Stack, Badge,
//   RangeSlider, Grid, Box, Modal, Textarea, Notification, Divider
// } from '@mantine/core';
// import { Search, MapPin, Users } from 'lucide-react';
// import { useDisclosure } from '@mantine/hooks';
// import { useForm } from '@mantine/form';
// import { jobService } from '../services/jobService';
// import axios from 'axios';

// type JobItem = {
//   id: number;
//   title: string;
//   companyName?: string;
//   company?: string;
//   logo?: string;
//   logoColor?: string;
//   experience?: string;
//   location: string;
//   salary?: string;
//   salaryRange?: string;
//   timeAgo?: string;
//   description?: string;
//   requirements?: string;
//   responsibilities?: string;
// };

// const JobListPage = () => {
//   const [opened, { open, close }] = useDisclosure(false);
//   const [salaryRange, setSalaryRange] = useState<[number, number]>([50, 80]);
//   const [jobs, setJobs] = useState<JobItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   const filterForm = useForm({
//     initialValues: {
//       title: '',
//       location: '',
//       jobType: '',
//       minSalary: '',
//       maxSalary: '',
//     },
//   });

//   const jobForm = useForm({
//     initialValues: {
//       title: '',
//       companyName: '',
//       location: '',
//       jobType: '',
//       salaryFrom: '',
//       salaryTo: '',
//       salaryRange: '',
//       description: '',
//       requirements: '',
//       responsibilities: '',
//       applicationDeadline: '',
//     },
//   });

//   const fetchJobs = async (params?: Record<string, any>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await jobService.getJobs(params);
//       setJobs(data);
//     } catch (err: any) {
//       setError(err?.message || 'Failed to fetch jobs');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const handleFilter = (values: any) => {
//     const params: any = {};
//     if (values.title) params.title = values.title;
//     if (values.location) params.location = values.location;
//     if (values.jobType) params.jobType = values.jobType;
//     if (values.minSalary) params.minSalary = Number(values.minSalary);
//     if (values.maxSalary) params.maxSalary = Number(values.maxSalary);

//     fetchJobs(params);
//   };

//   const handleCreate = async (values: any) => {
//     try {
//       setError(null);
//       const salaryRangeStr = values.salaryRange || `${values.salaryFrom || ''} - ${values.salaryTo || ''}`.trim();
//       const payload = {
//         title: values.title,
//         companyName: values.companyName,
//         location: values.location,
//         jobType: values.jobType,
//         salaryRange: salaryRangeStr,
//         description: values.description,
//         requirements: values.requirements,
//         responsibilities: values.responsibilities,
//         applicationDeadline: values.applicationDeadline,
//       };

//       const created = await jobService.createJob(payload);
//       setSuccess('Job created successfully');
//       close();
//       jobForm.reset();
//       fetchJobs();
//       setTimeout(() => setSuccess(null), 2000);
//     } catch (err: any) {
//       console.error(err);
//       setError(err?.response?.data?.message || err?.message || 'Create job failed');
//     }
//   };

//   return (
//     <Box style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
//       {/* Header */}
//       <Box style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         width: '100%',
//         padding: '16px 24px',
//         backgroundColor: 'white',
//         // boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//       }}>
//         <Paper 
//           style={{ 
//             backgroundColor: 'white',
//             borderRadius: 40,
//             boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//             padding: '12px 32px',
//             display: 'inline-flex',
//             alignItems: 'center',
//             width: 'auto',
//             marginBottom:1 
//           }}
//         >
//         <Container size="xl" style={{ padding: '0 24px' }}>
//           <Group justify="space-between" align="center">
//             <Group gap={0} style={{ flexWrap: 'nowrap' }}>
//               {/* <Box 
//                 style={{ 
//                   width: 40, 
//                   height: 40, 
//                   background: 'linear-gradient(45deg, #7c3aed, #a855f7)', 
//                   borderRadius: 8,
//                   cursor: 'pointer',
//                   marginRight: 24
//                 }} 
//               /> */}
//                   <img 
//                       src="/Frame54.jpg" 
//                       alt="Company Logo"
//                       style={{
//                         width: 40,
//                         height: 40,
//                         borderRadius: 8,
//                         cursor: 'pointer',
//                         marginRight: 24,
//                         objectFit: 'contain' // or 'cover' based on your preference
//                       }}
//                   />
//               <Group gap={24} style={{ marginRight: 32 }}>
//                 {['Home', 'Find Jobs', 'Find Talents', 'About us', 'Testimonials'].map((item) => (
//                   <Text key={item} size="sm" fw={500} style={{ cursor: 'pointer' }}>
//                     {item}
//                   </Text>
//                 ))}
//               </Group>
//             </Group>
//             <Button 
//               variant="filled"
//               style={{ 
//                 backgroundColor: '#7c3aed',
//                 color: 'white',
//                 borderRadius: 30,
//                 padding: '8px 20px',
//                 fontSize: '0.9rem',
//                 fontWeight: 600,
//                 boxShadow: '0 6px 12px rgba(124, 58, 237, 0.5)',
//                 whiteSpace: 'nowrap'
//               }}
//               onClick={open}
//             >
//               Create Jobs
//             </Button>
//           </Group>
//         </Container>
//         </Paper>
//       </Box>

//       {/* Filters Section */}
//       <Container size="xl" py="md">
//         <Paper p="md" radius="md" shadow="sm" mb="xl">
//           <Group justify="space-between" align="flex-end" gap="md">
//             <Group style={{ flex: 1 }} gap={0}>
//               <TextInput
//                 placeholder="Search By Job Title, Role"
//                 leftSection={<Search size={16} />}
//                 style={{ flex: 1, maxWidth: 320 }}
//                 variant="unstyled"
//                 {...filterForm.getInputProps('title')}
//                 onChange={(e) => {
//                   filterForm.getInputProps('title').onChange(e);
//                   handleFilter({...filterForm.values, title: e.currentTarget.value});
//                 }}
//               />
//               <Divider orientation="vertical" mx="md" />
              
//               <TextInput
//                 placeholder="Preferred Location"
//                 leftSection={<MapPin size={16} />}
//                 style={{ width: 200 }}
//                 variant="unstyled"
//                 {...filterForm.getInputProps('location')}
//                 onChange={(e) => {
//                   filterForm.getInputProps('location').onChange(e);
//                   handleFilter({...filterForm.values, location: e.currentTarget.value});
//                 }}
//               />
//               <Divider orientation="vertical" mx="md" />
              
//               <Select
//                 placeholder="Job type"
//                 leftSection={<Users size={16} />}
//                 data={['Full-time', 'Part-time', 'Contract', 'Internship']}
//                 style={{ width: 180 }}
//                 variant="unstyled"
//                 {...filterForm.getInputProps('jobType')}
//                 onChange={(value) => {
//                   filterForm.getInputProps('jobType').onChange(value);
//                   handleFilter({...filterForm.values, jobType: value});
//                 }}
//               />
//             </Group>

//             {/* <Box style={{ minWidth: 250 }}>
//               <Text size="sm" c="dimmed" mb={5}>Salary Per Month</Text>
//               <Text size="sm" mb={10}>₹{salaryRange[0]}k - ₹{salaryRange[1]}k</Text>
//               <RangeSlider 
//                 value={salaryRange} 
//                 onChange={(value) => {
//                   setSalaryRange(value);
//                   handleFilter({...filterForm.values, minSalary: value[0], maxSalary: value[1]});
//                 }}
//                 min={0} 
//                 max={200000} 
//                 style={{ width: '100%' }} 
//                 color="dark" 
//               />
//             </Box> */}
//             {/* // First modify the salary range display to show LPA instead of k */}
//             <Box style={{ minWidth: 250 }}>
//               <Text size="sm" c="dimmed" mb={5}>Salary Per Annum (LPA)</Text>
//               <Text size="sm" mb={10}>₹{salaryRange[0]} - ₹{salaryRange[1]}LPA</Text>
//               <RangeSlider 
//                 value={salaryRange} 
//                 onChange={(value) => {
//                   setSalaryRange(value);
//                   handleFilter({
//                     ...filterForm.values, 
//                     minSalary: value[0], 
//                     maxSalary: value[1]
//                   });
//                 }}
//                 min={0} 
//                 max={50}  // Adjust max to reasonable LPA value
//                 style={{ width: '100%' }} 
//                 color="dark" 
//               />
//             </Box>
//           </Group>
//         </Paper>

//         {/* Messages */}
//         {error && (
//           <Notification color="red" onClose={() => setError(null)} mb="md">
//             {String(error)}
//           </Notification>
//         )}
//         {success && (
//           <Notification color="teal" onClose={() => setSuccess(null)} mb="md">
//             {success}
//           </Notification>
//         )}

//         {/* Job Cards Grid */}
//         <Grid>
//           {(jobs.length ? jobs : Array.from({ length: 1 })).map((job, index) => {
//             if (!jobs.length) {
//               return (
//                 <Grid.Col key={`ph-${index}`} span={12}>
//                   <Paper p="lg" radius="md" shadow="sm">No jobs found.</Paper>
//                 </Grid.Col>
//               );
//             }

//             const j = job as JobItem;
//             return (
//               <Grid.Col key={j.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
//                 <Paper p="lg" radius="md" shadow="sm" style={{ height: '100%', position: 'relative' }}>
//                   <Badge size="sm" style={{ position: 'absolute', top: 16, right: 16, backgroundColor: '#e3f2fd', color: '#1976d2' }}>
//                     {j.timeAgo ?? 'new'}
//                   </Badge>

//                   <Stack gap="md" mt={20}>
//                     <Box style={{
//                       width: 48, height: 48, backgroundColor: j.logoColor ?? '#232f3e',
//                       borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
//                       color: 'white', fontSize: '20px', fontWeight: 'bold',
//                     }}>
//                       {j.logo ?? (j.companyName ? j.companyName[0] : 'C')}
//                     </Box>

//                     <div>
//                       <Text fw={600} size="lg" mb={8}>{j.title}</Text>

//                       <Group gap={16} mb="md">
//                         <Group gap={4}><Users size={14} color="#666" /><Text size="sm" c="dimmed">{j.experience || j.requirements }</Text></Group>
//                         <Group gap={4}><MapPin size={14} color="#666" /><Text size="sm" c="dimmed">{j.location}</Text></Group>
//                         <Text size="sm" c="dimmed">{j.salary ?? j.salaryRange ?? '—'}</Text>
//                       </Group>

//                       <Text size="sm" c="dimmed" mb="lg" lineClamp={3}>{j.description}</Text>
//                     </div>

//                     <Button variant="filled" fullWidth style={{ backgroundColor: '#2196f3', color: 'white' }}>Apply Now</Button>
//                   </Stack>
//                 </Paper>
//               </Grid.Col>
//             );
//           })}
//         </Grid>
//       </Container>

//       {/* Create Job Modal */}
//       <Modal opened={opened} onClose={close} title={<Text fw={600} size="lg">Create Job Opening</Text>} size="lg" centered>
//         <form onSubmit={jobForm.onSubmit((values) => handleCreate(values))}>
//           <Stack gap="md">
//             <Group grow>
//               <TextInput label="Job Title" placeholder="Full Stack Developer" required {...jobForm.getInputProps('title')} />
//               <TextInput label="Company Name" placeholder="Amazon" required {...jobForm.getInputProps('companyName')} />
//             </Group>

//             <Group grow>
//               <TextInput label="Location" placeholder="Hyderabad" required {...jobForm.getInputProps('location')} />
//               <Select label="Job Type" placeholder="Full-time" data={['Full-time', 'Part-time', 'Contract', 'Internship']} required {...jobForm.getInputProps('jobType')} />
//             </Group>

//             <Group grow>
//               <TextInput label="Salary From (per annum)" placeholder="500000" {...jobForm.getInputProps('salaryFrom')} />
//               <TextInput label="Salary To (per annum)" placeholder="800000" {...jobForm.getInputProps('salaryTo')} />
//             </Group>

//             <TextInput label="Application Deadline" type="date" {...jobForm.getInputProps('applicationDeadline')} />

//             <Textarea label="Job Description" placeholder="Describe the role" required {...jobForm.getInputProps('description')} />
//             <Textarea label="Requirements" placeholder="List requirements" required {...jobForm.getInputProps('requirements')} />
//             <Textarea label="Responsibilities" placeholder="List responsibilities" required {...jobForm.getInputProps('responsibilities')} />

//             <Group justify="space-between" mt="lg">
//               <Button variant="outline" color="gray" onClick={close}>Save Draft ✓</Button>
//               <Button type="submit" variant="filled" style={{ backgroundColor: '#2196f3' }}>Publish →</Button>
//             </Group>
//           </Stack>
//         </form>
//       </Modal>
//     </Box>
//   );
// };

// export default JobListPage;

'use client';

import { useEffect, useState } from 'react';
import {
  Container, Paper, Text, Button, TextInput, Select, Group, Stack, Badge,
  RangeSlider, Grid, Box, Modal, Textarea, Notification, Divider
} from '@mantine/core';
import { Search, MapPin, Users } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { jobService } from '../services/jobService';

type JobItem = {
  id: number;
  title: string;
  companyName?: string;
  logo?: string;
  logoColor?: string;
  experience?: string;
  location: string;
  salary?: string;
  salaryRange?: string;
  timeAgo?: string;
  description?: string;
  requirements?: string;
  responsibilities?: string;
};

const JobListPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([5, 10]); // LPA default
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const filterForm = useForm({
    initialValues: {
      title: '',
      location: '',
      jobType: '',
      minSalary: '',
      maxSalary: '',
    },
  });

  const jobForm = useForm({
    initialValues: {
      title: '',
      companyName: '',
      location: '',
      jobType: '',
      salaryFrom: '',
      salaryTo: '',
      description: '',
      requirements: '',
      responsibilities: '',
      applicationDeadline: '',
    },
  });

  const fetchJobs = async (params?: Record<string, any>) => {
    try {
      setLoading(true);
      setError(null);
      const data = await jobService.getJobs(params);
      setJobs(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleFilter = (updatedValues: any) => {
    const params: any = {};
    if (updatedValues.title) params.title = updatedValues.title;
    if (updatedValues.location) params.location = updatedValues.location;
    if (updatedValues.jobType) params.jobType = updatedValues.jobType;
    if (updatedValues.minSalary) params.minSalary = Number(updatedValues.minSalary);
    if (updatedValues.maxSalary) params.maxSalary = Number(updatedValues.maxSalary);

    fetchJobs(params);
  };

  const handleCreate = async (values: any) => {
    try {
      setError(null);
      const salaryRangeStr =
        values.salaryFrom && values.salaryTo
          ? `${values.salaryFrom} - ${values.salaryTo} LPA`
          : '';

      const payload = {
        title: values.title,
        companyName: values.companyName,
        location: values.location,
        jobType: values.jobType,
        salaryRange: salaryRangeStr,
        description: values.description,
        requirements: values.requirements,
        responsibilities: values.responsibilities,
        applicationDeadline: values.applicationDeadline,
      };

      await jobService.createJob(payload);
      setSuccess('Job created successfully');
      close();
      jobForm.reset();
      fetchJobs();
      setTimeout(() => setSuccess(null), 2000);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Create job failed');
    }
  };

  return (
    <Box style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <Box style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '16px 24px',
        backgroundColor: 'white',
      }}>
        <Paper
          style={{
            backgroundColor: 'white',
            borderRadius: 40,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '12px 32px',
            display: 'inline-flex',
            alignItems: 'center',
            width: 'auto',
            marginBottom: 1
          }}
        >
          <Container size="xl" style={{ padding: '0 24px' }}>
            <Group justify="space-between" align="center">
              <Group gap={0} style={{ flexWrap: 'nowrap' }}>
                <img
                  src="/Frame54.jpg"
                  alt="Company Logo"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    cursor: 'pointer',
                    marginRight: 24,
                    objectFit: 'contain'
                  }}
                />
                <Group gap={24} style={{ marginRight: 32 }}>
                  {['Home', 'Find Jobs', 'Find Talents', 'About us', 'Testimonials'].map((item) => (
                    <Text key={item} size="sm" fw={500} style={{ cursor: 'pointer' }}>
                      {item}
                    </Text>
                  ))}
                </Group>
              </Group>
              <Button
                variant="filled"
                style={{
                  backgroundColor: '#7c3aed',
                  color: 'white',
                  borderRadius: 30,
                  padding: '8px 20px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  boxShadow: '0 6px 12px rgba(124, 58, 237, 0.5)',
                  whiteSpace: 'nowrap'
                }}
                onClick={open}
              >
                Create Jobs
              </Button>
            </Group>
          </Container>
        </Paper>
      </Box>

      {/* Filters Section */}
      <Container size="xl" py="md">
        <Paper p="md" radius="md" shadow="sm" mb="xl">
          <Group justify="space-between" align="flex-end" gap="md">
            <Group style={{ flex: 1 }} gap={0}>
              <TextInput
                placeholder="Search By Job Title, Role"
                leftSection={<Search size={16} />}
                style={{ flex: 1, maxWidth: 320 }}
                variant="unstyled"
                {...filterForm.getInputProps('title')}
                onChange={(e) => {
                  filterForm.setFieldValue('title', e.currentTarget.value);
                  handleFilter({ ...filterForm.values, title: e.currentTarget.value });
                }}
              />
              <Divider orientation="vertical" mx="md" />

              <TextInput
                placeholder="Preferred Location"
                leftSection={<MapPin size={16} />}
                style={{ width: 200 }}
                variant="unstyled"
                {...filterForm.getInputProps('location')}
                onChange={(e) => {
                  filterForm.setFieldValue('location', e.currentTarget.value);
                  handleFilter({ ...filterForm.values, location: e.currentTarget.value });
                }}
              />
              <Divider orientation="vertical" mx="md" />

              <Select
                placeholder="Job type"
                leftSection={<Users size={16} />}
                data={['Full-time', 'Part-time', 'Contract', 'Internship']}
                style={{ width: 180 }}
                variant="unstyled"
                {...filterForm.getInputProps('jobType')}
                onChange={(value) => {
                  filterForm.setFieldValue('jobType', value || '');
                  handleFilter({ ...filterForm.values, jobType: value });
                }}
              />
            </Group>

            <Box style={{ minWidth: 250 }}>
              <Text size="sm" c="dimmed" mb={5}>Salary Per Annum (LPA)</Text>
              <Text size="sm" mb={10}>₹{salaryRange[0]} - ₹{salaryRange[1]} LPA</Text>
              <RangeSlider
                value={salaryRange}
                onChange={(value) => {
                  setSalaryRange(value);
                  handleFilter({
                    ...filterForm.values,
                    minSalary: value[0],
                    maxSalary: value[1]
                  });
                }}
                min={0}
                max={50}
                style={{ width: '100%' }}
                color="dark"
              />
            </Box>
          </Group>
        </Paper>

        {/* Messages */}
        {error && (
          <Notification color="red" onClose={() => setError(null)} mb="md">
            {String(error)}
          </Notification>
        )}
        {success && (
          <Notification color="teal" onClose={() => setSuccess(null)} mb="md">
            {success}
          </Notification>
        )}

        {/* Job Cards */}
        <Grid>
          {jobs.length === 0 ? (
            <Grid.Col span={12}>
              <Paper p="lg" radius="md" shadow="sm">No jobs found.</Paper>
            </Grid.Col>
          ) : (
            jobs.map((j) => (
              <Grid.Col key={j.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <Paper p="lg" radius="md" shadow="sm" style={{ height: '100%', position: 'relative' }}>
                  <Badge size="sm" style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2'
                  }}>
                    {j.timeAgo ?? 'new'}
                  </Badge>

                  <Stack gap="md" mt={20}>
                    <Box style={{
                      width: 48,
                      height: 48,
                      backgroundColor: j.logoColor ?? '#232f3e',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '20px',
                      fontWeight: 'bold',
                    }}>
                      {j.logo ?? (j.companyName ? j.companyName[0] : 'C')}
                    </Box>

                    <div>
                      <Text fw={600} size="lg" mb={8}>{j.title}</Text>
                      <Group gap={16} mb="md">
                        <Group gap={4}><Users size={14} color="#666" /><Text size="sm" c="dimmed">{j.experience || j.requirements}</Text></Group>
                        <Group gap={4}><MapPin size={14} color="#666" /><Text size="sm" c="dimmed">{j.location}</Text></Group>
                        <Text size="sm" c="dimmed">{j.salary ?? j.salaryRange ?? '—'}</Text>
                      </Group>
                      <Text size="sm" c="dimmed" mb="lg" lineClamp={3}>{j.description}</Text>
                    </div>

                    <Button variant="filled" fullWidth style={{ backgroundColor: '#2196f3', color: 'white' }}>Apply Now</Button>
                  </Stack>
                </Paper>
              </Grid.Col>
            ))
          )}
        </Grid>
      </Container>

      {/* Create Job Modal */}
      <Modal opened={opened} onClose={close} title={<Text fw={600} size="lg">Create Job Opening</Text>} size="lg" centered>
        <form onSubmit={jobForm.onSubmit((values) => handleCreate(values))}>
          <Stack gap="md">
            <Group grow>
              <TextInput label="Job Title" placeholder="Full Stack Developer" required {...jobForm.getInputProps('title')} />
              <TextInput label="Company Name" placeholder="Amazon" required {...jobForm.getInputProps('companyName')} />
            </Group>
            <Group grow>
              <TextInput label="Location" placeholder="Hyderabad" required {...jobForm.getInputProps('location')} />
              <Select label="Job Type" placeholder="Full-time" data={['Full-time', 'Part-time', 'Contract', 'Internship']} required {...jobForm.getInputProps('jobType')} />
            </Group>
            <Group grow>
              <TextInput label="Salary From (LPA)" placeholder="5" {...jobForm.getInputProps('salaryFrom')} />
              <TextInput label="Salary To (LPA)" placeholder="8" {...jobForm.getInputProps('salaryTo')} />
            </Group>
            <TextInput label="Application Deadline" type="date" {...jobForm.getInputProps('applicationDeadline')} />
            <Textarea label="Job Description" placeholder="Describe the role" required {...jobForm.getInputProps('description')} />
            <Textarea label="Requirements" placeholder="List requirements" required {...jobForm.getInputProps('requirements')} />
            <Textarea label="Responsibilities" placeholder="List responsibilities" required {...jobForm.getInputProps('responsibilities')} />
            <Group justify="space-between" mt="lg">
              <Button variant="outline" color="gray" onClick={close}>Save Draft ✓</Button>
              <Button type="submit" variant="filled" style={{ backgroundColor: '#2196f3' }}>Publish →</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
};

export default JobListPage;
