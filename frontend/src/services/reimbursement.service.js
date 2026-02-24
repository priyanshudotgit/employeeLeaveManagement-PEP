import api from './api';

export const submitReimbursement = async (data) => {
    const response = await api.post('/reimbursements', data);
    return response.data;
};

export const getMyReimbursements = async () => {
    const response = await api.get('/reimbursements/my');
    return response.data;
};

export const getAllReimbursements = async () => {
    const response = await api.get('/reimbursements/all');
    return response.data;
};

export const resolveReimbursement = async (id, status) => {
    const response = await api.patch(`/reimbursements/${id}/resolve`, { status });
    return response.data;
};
