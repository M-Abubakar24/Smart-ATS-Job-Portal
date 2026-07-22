import API from "../api/axios";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Get applicants for a job
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