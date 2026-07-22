import API from "../api/axios";

export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/dashboard/jobseeker", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};