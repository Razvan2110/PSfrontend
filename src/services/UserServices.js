import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

class userservice{
     getUsers() {
    return axios.get(API_URL, {
        headers: {
            Authorization: "Basic " + btoa("ionescu@yahoo.com:parola2")
        }
    })
    .then((response) => {
        console.log("Response from backend:", response.data); // Verifică datele primite
        return response;
    })
    .catch((error) => {
        console.error("Error fetching users:", error); // Loghează erorile
        throw error;
    });
}
    createUser(user){
        return axios.post(API_URL, user);
    }
    getUserById(id){
        return axios.get(`${API_URL}${id}`);
    }
    updateUser(id, user){
        return axios.put(`${API_URL}${id}`, user);
    }
}
export default new userservice();