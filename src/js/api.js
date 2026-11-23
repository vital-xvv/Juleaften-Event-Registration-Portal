import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 120000,
    withCredentials: true
});


// Authentication
export const login = async (requestBody) => {
    const response = await api.post('/auth', requestBody);
    return response.data;
}

export const getAuthentication = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};


//Profiles
export const verifyEmail = async (token) => {
    const response = await api.post('/profiles/verify', { token });
    return response.data;
}


// Registrations
export const registerUser = async(values) => {
    const response = await api.post("/visits/register", values);
    return response.data;
}

export const getVisitInfo = async (eventName) => {
    const response = await api.get(`/visits/${encodeURIComponent(eventName)}`);
    return response.data;
}

export const signInWithGoogle = () => {
    const baseURL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    const authUrl = `${baseURL}/oauth2/authorization/google`;

    window.location.href = authUrl;
};

export const getEventStatistics = async (eventName) => {
    const response = await api.get(`/events/statistics/${encodeURIComponent(eventName)}`);
    return response.data;
}

export const getDetailedUserInfo = async (eventName) => {
    const response = await api.get(`/events/user/detailed?eventName=${encodeURIComponent(eventName)}`);
    return response.data;
}