import API from "../api/axios";

export const getJobs = async (keyword = "") => {
  const response = await API.get(`/jobs?keyword=${keyword}`);
  return response.data;
};

export const getJobById = async (id) => {
  const response = await API.get(`/jobs/${id}`);
  return response.data;
};