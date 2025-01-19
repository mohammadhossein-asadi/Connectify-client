const API_CONFIG = {
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "https://connectifysocial.vercel.app",
    "Access-Control-Allow-Credentials": "true",
  },
  credentials: "include",
};

export const fetchWithConfig = async (endpoint, options = {}) => {
  const isFormData = options.body instanceof FormData;
  const headers = isFormData ? {} : API_CONFIG.headers;

  try {
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
      const error = await response.json().catch(() => ({
        message: `HTTP error! status: ${response.status}`,
      }));
      throw new Error(error.message || "API request failed");
    }

    return response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

export default API_CONFIG;
