import { useState, useEffect } from 'react';
import { getUserRoleById } from '../model/repository/UserRepository';

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getClients,
    getAdmins,
    getManagers,
    getEmployees,
    loginUser
} from '../model/repository/UserRepository';
import User from '../model/repository/User';

const useUserViewModel = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch all users
    const fetchAllUsers = async () => {
        setLoading(true);
        try {
            const response = await getAllUsers();
            const userList = response.data.map(
                (user) =>
                    new User(
                        user.id,
                        user.nume,
                        user.prenume,
                        user.email,
                        user.telefon,
                        user.role
                    )
            );
            setUsers(userList);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch user by ID
    const fetchUserById = async (id) => {
        setLoading(true);
        try {
            const response = await getUserById(id);
            return new User(
                response.data.id,
                response.data.nume,
                response.data.prenume,
                response.data.email,
                response.data.telefon,
                response.data.role
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addUser = async (user) => {
    setLoading(true);
    try {
        const response = await createUser(user); 
        setUsers([...users, response.data]);
    } catch (err) {
        setError('Failed to add user');
    } finally {
        setLoading(false);
    }
};

const modifyUser = async (id, updatedUser) => {
    setLoading(true);
    try {
        const response = await updateUser(id, updatedUser); 
        setUsers(users.map((user) => (user.id === id ? response.data : user))); 
    } catch (err) {
        setError('Failed to update user');
    } finally {
        setLoading(false);
    }
};

   
    const removeUser = async (id) => {
        setLoading(true);
        try {
            await deleteUser(id);
            await fetchAllUsers(); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchClients = async () => {
        setLoading(true);
        try {
            const response = await getClients();
            return response.data.map(
                (user) =>
                    new User(
                        user.id,
                        user.nume,
                        user.prenume,
                        user.email,
                        user.telefon,
                        user.role
                    )
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const fetchUserRole = async (id) => {
    try {
        const response = await getUserRoleById(id);
        return response.data; 
    } catch (err) {
        console.error("Error fetching user role:", err);
        throw err;
    }
};
    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const response = await getAdmins();
            return response.data.map(
                (user) =>
                    new User(
                        user.id,
                        user.nume,
                        user.prenume,
                        user.email,
                        user.telefon,
                        user.role
                    )
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchManagers = async () => {
        setLoading(true);
        try {
            const response = await getManagers();
            return response.data.map(
                (user) =>
                    new User(
                        user.id,
                        user.nume,
                        user.prenume,
                        user.email,
                        user.telefon,
                        user.role
                    )
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await getEmployees();
            return response.data.map(
                (user) =>
                    new User(
                        user.id,
                        user.nume,
                        user.prenume,
                        user.email,
                        user.telefon,
                        user.role
                    )
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Login user
    const login = async (loginRequest) => {
        setLoading(true);
        try {
            const response = await loginUser(loginRequest);
            return response.data; 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        users,
        error,
        loading,
        fetchAllUsers,
        fetchUserById,
        addUser,
        modifyUser,
        removeUser,
        fetchClients,
        fetchAdmins,
        fetchManagers,
        fetchEmployees,
        login
    };
};

export default useUserViewModel;