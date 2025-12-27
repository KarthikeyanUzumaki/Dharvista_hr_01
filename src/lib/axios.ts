// src/lib/axios.ts
import axios from "axios";

// This is where the backend developer will put their API URL.
// For now, it points to localhost.
const BASE_URL = "http://localhost:5000/api"; 

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// AUTOMATIC TOKEN ATTACHMENT
// This "interceptor" checks if you are logged in as admin.
// If yes, it stamps your 'admin_token' onto every request automatically.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});