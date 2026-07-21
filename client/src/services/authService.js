import API from "../api/axios";

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const uploadResume = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("resume", file);

  const response = await API.post("/upload/resume", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
export const analyzeResume = async () => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    "/ats/analyze-resume",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};