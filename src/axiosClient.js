import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_APP_ENV === 'production'
    ? import.meta.env.VITE_APP_ADMIN_URL_LIVE
    : import.meta.env.VITE_APP_ADMIN_URL_LOCAL,

    headers: {
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('ACCESS_TOKEN'); // Corrected method
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Ensure errors are properly propagated
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try{    
            const { response } = error;
        
            if (response && response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                // Optionally redirect to login page or notify user
                // window.location.href = '/login'; // Uncomment this if you want to redirect to login
            }
        } catch (err) {
            console.error(err);
        }
        
        
        return Promise.reject(error); // Ensure errors are properly propagated
    }
);

export default axiosClient;
