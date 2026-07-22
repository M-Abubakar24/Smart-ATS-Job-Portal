import API from "../api/axios";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Apply for a job
export const applyJob = async (jobId, coverLetter) => {
  const response = await API.post(
    `/applications/${jobId}`,
    { coverLetter },
    getToken()
  );

  return response.data;
};

// Get my applications (Jobseeker)
export const getMyApplications = async () => {
  const response = await API.get(
    "/applications/my",
    getToken()
  );

  return response.data;
};

// Get applicants for a specific job (Recruiter)
export const getApplicants = async (jobId) => {
  const response = await API.get(
    `/applications/job/${jobId}`,
    getToken()
  );

  return response.data;
};

// Update application status
export const updateApplicationStatus = async (
  applicationId,
  status
) => {
  const response = await API.put(
    `/applications/${applicationId}/status`,
    { status },
    getToken()
  );

  return response.data;
};

// Withdraw application
export const withdrawApplication = async (applicationId) => {
  const response = await API.delete(
    `/applications/${applicationId}`,
    getToken()
  );

  return response.data;
};