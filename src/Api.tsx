import axios from 'axios';

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

let csrfToken: string | null = localStorage.getItem('csrfToken');

// Utility function to set the CSRF token from your login response
export function setCsrfToken(token: string) {
    csrfToken = token;
    localStorage.setItem("csrf_token", token);
}

const apiClient = axios.create({
    baseURL: baseApiUrl,
    withCredentials: true,
});

// Add an interceptor to attach CSRF token for unsafe methods
apiClient.interceptors.request.use(
    (config) => {
        const method = config.method?.toUpperCase();
        const isUnsafe = method === 'POST' || method === 'PUT' || method === 'DELETE';

        if (isUnsafe && csrfToken) {
            config.headers['X-CSRF-Token'] = csrfToken;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
