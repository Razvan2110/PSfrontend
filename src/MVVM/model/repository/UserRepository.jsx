import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const getAllUsers = () => axios.get(API_URL);

export const getUserById = (id) => axios.get(`${API_URL}/${id}`);
export const createUser = (user) => axios.post(API_URL, user);

export const updateUser = (id,user) => axios.put(`${API_URL}/${id}`,id,user);

export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);

export const getUserRoleById = (id) => axios.get(`${API_URL}/${id}/role`);


export const getClients = () => axios.get(`${API_URL}/role/CLIENT`);
export const getAdmins = () => axios.get(`${API_URL}/role/ADMIN`);
export const getManagers = () => axios.get(`${API_URL}/role/MANAGER`);
export const getEmployees = () => axios.get(`${API_URL}/role/ANGAJAT`);



export const loginUser = (loginRequest) => axios.post(`${API_URL}/login`, loginRequest);