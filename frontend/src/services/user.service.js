import api from './api';

export const getManagers = async () => {
    const response = await api.get('/users/managers');
    return response.data;
};

export const createUser = async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
};

export const assignManager = async (userId, managerId) => {
    const response = await api.patch(`/users/${userId}/manager`, { managerId });
    return response.data;
};

export const updateUserStatus = async (userId, status) => {
    const response = await api.patch(`/users/${userId}/status`, { status });
    return response.data;
};
