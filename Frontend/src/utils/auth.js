// Authentication utility functions
export const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token') || !!localStorage.getItem('user');
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const setAuthData = (token, user) => {
    if (token) {
        localStorage.setItem('token', token);
    }
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
};

// API call with authentication
export const authenticatedFetch = async (url, options = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, {
        ...options,
        headers,
    });
};
