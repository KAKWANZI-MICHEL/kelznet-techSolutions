import axios from "axios";

// Base URLs
const AUTH_URL = "http://127.0.0.1:5000/api/v1/auth";
const MESSAGES_URL = "http://127.0.0.1:5000/api/v1/messages";
const REQUESTS_URL = "http://127.0.0.1:5000/api/v1/requests";
const SERVICES_URL = "http://127.0.0.1:5000/api/v1/services";
const USERS_URL = "http://127.0.0.1:5000/api/v1/users";

// ---------- AUTH ----------

// Register
export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${AUTH_URL}/register`, userData);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

// Login
export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(`${AUTH_URL}/login`, credentials);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

// Get profile
export const getProfile = async (token) => {
  try {
    const res = await axios.get(`${AUTH_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

// Logout
export const logoutUser = async () => {
  const res = await axios.get(`${AUTH_URL}/logout`);
  return res.data;
};

// ---------- MESSAGES ----------

// Get all messages
export const getMessages = async (token) => {
  const res = await axios.get(MESSAGES_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Create new message
export const createMessage = async (messageData) => {
  const res = await axios.post(MESSAGES_URL, messageData);
  return res.data;
};

// ---------- SERVICE REQUESTS ----------

// Get all requests
export const getRequests = async (token) => {
  const res = await axios.get(REQUESTS_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Create new request
export const createRequest = async (requestData) => {
  const res = await axios.post(REQUESTS_URL, requestData);
  return res.data;
};

// ---------- SERVICES ----------

// Get all services
export const getServices = async () => {
  const res = await axios.get(SERVICES_URL);
  return res.data;
};

// Create new service
export const createService = async (serviceData, token) => {
  const res = await axios.post(SERVICES_URL, serviceData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// ---------- USERS ----------

// Get all users
export const getUsers = async (token) => {
  const res = await axios.get(USERS_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
