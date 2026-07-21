import API from "../api/axios";

export const applyJob = async (jobId, coverLetter = "") => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    `/applications/${jobId}`,
    { coverLetter },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyApplications = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/applications/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const withdrawApplication = async (applicationId) => {
  const token = localStorage.getItem("token");

  const response = await API.delete(`/applications/${applicationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};