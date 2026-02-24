import api from './api';

export const applyLeave = async (leaveData) => {
    const response = await api.post('/leaves/apply', leaveData);
    return response.data;
};

export const getMyLeaves = async () => {
    const response = await api.get('/leaves/my');
    return response.data;
};

export const getTeamLeaves = async () => {
    const response = await api.get('/leaves/team');
    return response.data;
};

export const approveLeave = async (id) => {
    const response = await api.patch(`/leaves/${id}/approve`);
    return response.data;
};

export const rejectLeave = async (id) => {
    const response = await api.patch(`/leaves/${id}/reject`);
    return response.data;
};
