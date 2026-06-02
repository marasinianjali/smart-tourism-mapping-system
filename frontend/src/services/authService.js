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