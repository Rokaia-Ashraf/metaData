import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };
  const getRole = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.role;
  };

  const [token, setToken] = useState(getToken());
  const [role, setRole] = useState(getRole());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken?.token);
    setRole(userToken?.role);
    window.location.reload();
  };

  const clearToken = () => {
    localStorage.clear();
    window.location.reload();
  };
  return {
    setToken: saveToken,
    clearToken,
    token,
    role,
  };
}
