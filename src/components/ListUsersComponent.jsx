import React, { Component } from 'react';
import UserServices from '../services/UserServices';

class ListUsersComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
           users: []
        };
    }

   componentDidMount() {
        // Preluăm utilizatorii din backend
        UserServices.getUsers()
            .then((res) => {
                console.log("Response from backend:", res.data); // Debugging
                this.setState({ users: res.data }); // Setăm utilizatorii în stare
            })
            .catch((error) => {
                console.error("Error fetching users:", error); // Logăm erorile
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Users List</h2>
                <button className='btn btn-primary mb-2' onClick={addNew}>Add Employee</button>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User First Name</th>
                                <th>User Last Name</th>
                                <th>User Email</th>
                                <th>User Phone</th>
                                <th>User Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.nume}</td>
                                            <td>{user.prenume}</td>
                                            <td>{user.email}</td>
                                            <td>{user.telefon}</td>
                                            <td>{user.role}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div> 
        );
    }
}

export default ListUsersComponent;