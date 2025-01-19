const API_CONFIG = {
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
};

export const fetchWithConfig = async (endpoint, options = {}) => {
  const isFormData = options.body instanceof FormData;
  const headers = isFormData ? {} : API_CONFIG.headers;

  const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
    credentials: API_CONFIG.credentials,
    mode: "cors",
  });

  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch (e) {
      throw new Error("Network response was not ok");
    }
    throw new Error(error.message || "API request failed");
  }

  return response.json();
};

export default API_CONFIG;
