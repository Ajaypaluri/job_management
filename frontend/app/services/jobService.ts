// import axios from 'axios';

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// export const jobService = {
//   getJobs: async (params?: Record<string, any>) => {
//     const res = await axios.get(`${API_BASE}/jobs`, { params });
//     return res.data;
//   },

//   getJob: async (id: number) => {
//     const res = await axios.get(`${API_BASE}/jobs/${id}`);
//     return res.data;
//   },

//   createJob: async (payload: any) => {
//     const res = await axios.post(`${API_BASE}/jobs`, payload);
//     return res.data;
//   },

//   updateJob: async (id: number, payload: any) => {
//     const res = await axios.put(`${API_BASE}/jobs/${id}`, payload);
//     return res.data;
//   },

//   deleteJob: async (id: number) => {
//     const res = await axios.delete(`${API_BASE}/jobs/${id}`);
//     return res.data;
//   },
// };

import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://job-management-backend-701e.onrender.com';

export const jobService = {
  getJobs: async (params?: Record<string, any>) => {
    try {
      // Normalize salary parameters
      const normalizedParams = {
        ...params,
        minSalary: params?.minSalary ? Number(params.minSalary) : undefined,
        maxSalary: params?.maxSalary ? Number(params.maxSalary) : undefined
      };

      const res = await axios.get(`${API_BASE}/jobs`, { 
        params: normalizedParams,
        timeout: 10000 // 10 second timeout
      });
      
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 
          `Failed to fetch jobs: ${error.message}`
        );
      }
      throw error;
    }
  },

  getJob: async (id: number) => {
    try {
      const res = await axios.get(`${API_BASE}/jobs/${id}`, {
        validateStatus: (status) => status === 200 || status === 404
      });
      
      if (res.status === 404) {
        throw new Error('Job not found');
      }
      
      return res.data;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to fetch job'
      );
    }
  },

  createJob: async (payload: any) => {
  try {
    // Validate salary format before sending
    if (payload.salaryRange && !/^\d+\s?LPA$/i.test(payload.salaryRange)) {
      throw new Error('Salary must be in format "X LPA" (e.g., "10 LPA")');
    }

    const res = await axios.post(`${API_BASE}/jobs`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    });
    
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage = 
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to create job';
      
      throw new Error(`API Error: ${errorMessage}`);
    }
    
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    
    throw new Error('Unknown error occurred while creating job');
  }
},

  updateJob: async (id: number, payload: any) => {
    try {
      const res = await axios.put(`${API_BASE}/jobs/${id}`, payload);
      return res.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || 'Failed to update job'
          : 'An unexpected error occurred'
      );
    }
  },

  deleteJob: async (id: number) => {
    try {
      const res = await axios.delete(`${API_BASE}/jobs/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || 'Failed to delete job'
          : 'An unexpected error occurred'
      );
    }
  },

  // Helper for salary conversion
  formatSalaryForDisplay: (salaryRange: string) => {
    if (!salaryRange) return 'Not specified';
    const numericValue = parseFloat(salaryRange.replace(/[^0-9.]/g, ''));
    return isNaN(numericValue) ? salaryRange : `${numericValue} LPA`;
  }
};