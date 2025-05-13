import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PageAdmin = () => {
    const [users, setUsers] = useState([]); // Lista utilizatorilor
    const [error, setError] = useState('');
    const [newUser, setNewUser] = useState({ username: '', email: '', role: '' }); // Formular pentru adăugare
    const [selectedUser, setSelectedUser] = useState(null); 
    // Fetch users from backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users'); 
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch users');
            }
        };
        fetchUsers();
    }, []);

    const handleAddUser = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/users', newUser);
            setUsers([...users, response.data]); 
            setNewUser({ email: '', role: '', nume: '', prenume: '', telefon: '', password: '' }); 
        } catch (err) {
            setError('Failed to add user');
        }
    };
    const handleUpdateUser = async () => {
        try {
            
            const { authorities, ...userToUpdate } = selectedUser;

            const response = await axios.put(`http://localhost:8080/api/users/${selectedUser.id}`, userToUpdate);
            setUsers(users.map((user) => (user.id === selectedUser.id ? response.data : user))); 
            setSelectedUser(null); 
        } catch (err) {
            console.error("Failed to update user:", err); 
            setError('Failed to update user');
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${id}`);
            setUsers(users.filter((user) => user.id !== id)); 
        } catch (err) {
            setError('Failed to delete user');
        }
    };

    return (
        <div>
            <h1>Admin Page - Manage Users</h1>
            {error && <p className="error">{error}</p>}

            {/* Tabel cu utilizatori */}
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Nume</th>
                        <th>Prenume</th>
                        <th>Telefon</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.nume}</td>
                            <td>{user.prenume}</td>
                            <td>{user.telefon}</td>
                            <td>{user.password}</td>
                            <td>
                                <button onClick={() => setSelectedUser(user)}>Edit</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Formular pentru adăugarea unui utilizator */}
            <h2>Add New User</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    selectedUser ? handleUpdateUser() : handleAddUser();
                }}
            >
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={selectedUser ? selectedUser.username : newUser.username}
                        onChange={(e) =>
                            selectedUser
                                ? setSelectedUser({ ...selectedUser, username: e.target.value })
                                : setNewUser({ ...newUser, username: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={selectedUser ? selectedUser.email : newUser.email}
                        onChange={(e) =>
                            selectedUser
                                ? setSelectedUser({ ...selectedUser, email: e.target.value })
                                : setNewUser({ ...newUser, email: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select
                        value={selectedUser ? selectedUser.role : newUser.role}
                        onChange={(e) =>
                            selectedUser
                                ? setSelectedUser({ ...selectedUser, role: e.target.value })
                                : setNewUser({ ...newUser, role: e.target.value })
                        }
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="CLIENT">Client</option>
                        <option value="ANGAJAT">Angajat</option>
                        <option value="MANAGER">Manager</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <div>
                    <label>Nume:</label>
                    <input
                        type="text"
                        value={selectedUser ? selectedUser.nume : newUser.nume}
                        onChange={(e) =>
                            selectedUser
                                ? setSelectedUser({ ...selectedUser, nume: e.target.value })
                                : setNewUser({ ...newUser, nume: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label>Prenume:</label>
                    <input
                        type="text"
                        value={selectedUser ? selectedUser.prenume : newUser.prenume}
                        onChange={(e) =>
                            selectedUser
                                ? setSelectedUser({ ...selectedUser, prenume: e.target.value })
                                : setNewUser({ ...newUser, prenume: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label>Telefon:</label>
                    <input
                        type="text"
                        value={selectedUser ? selectedUser.telefon : newUser.telefon}
                        onChange={(e) =>
                            selectedUser
                                ? setSelectedUser({ ...selectedUser, telefon: e.target.value })
                                : setNewUser({ ...newUser, telefon: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={selectedUser ? selectedUser.password : newUser.password}
                        onChange={(e) =>
                            selectedUser
                                ? setSelectedUser({ ...selectedUser, password: e.target.value })
                                : setNewUser({ ...newUser, password: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    {/* Buton pentru Add User */}
                    <button
                        type="button"
                        onClick={handleAddUser}
                        disabled={!!selectedUser} 
                    >
                        Add User
                    </button>

                    {/* Buton pentru Update User */}
                    <button
                        type="button"
                        onClick={handleUpdateUser}
                        disabled={!selectedUser} 
                    >
                        Update User
                    </button>

                    {/* Buton pentru Resetare */}
                    <button
                        type="button"
                        onClick={() => setSelectedUser(null)} 
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PageAdmin;