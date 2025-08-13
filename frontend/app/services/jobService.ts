import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const jobService = {
  getJobs: async (params?: Record<string, any>) => {
    const res = await axios.get(`${API_BASE}/jobs`, { params });
    return res.data;
  },

  getJob: async (id: number) => {
    const res = await axios.get(`${API_BASE}/jobs/${id}`);
    return res.data;
  },

  createJob: async (payload: any) => {
    const res = await axios.post(`${API_BASE}/jobs`, payload);
    return res.data;
  },

  updateJob: async (id: number, payload: any) => {
    const res = await axios.put(`${API_BASE}/jobs/${id}`, payload);
    return res.data;
  },

  deleteJob: async (id: number) => {
    const res = await axios.delete(`${API_BASE}/jobs/${id}`);
    return res.data;
  },
};

