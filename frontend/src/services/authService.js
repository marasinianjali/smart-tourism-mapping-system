import api from "../api/axios";

export const login = async (email, password) => {
  const response = await api.post(
    "accounts/login/",
    {
      email,
      password,
    }
  );

  return response.data;
};

export const getProfile = async () => {
  const response = await api.get(
    "accounts/profile/",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
  );

  return response.data;
};