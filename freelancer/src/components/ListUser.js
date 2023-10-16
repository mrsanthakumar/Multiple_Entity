import axios from "axios"
import { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListUser() {

    const [freelancer, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);
    
    function getUsers() {
        axios.get('http://localhost/api1/freelancer/').then(function(response) {
            console.log(response.data);
            setUsers(response.data);
        });
    }

    const deleteUser = (Freelancer_ID) => {
        axios.delete(`http://localhost/api1/user/${Freelancer_ID}/delete`).then(function(response){
            console.log(response.data);
            getUsers();
        });
    }
    return (
        <div>
            <h1>List Freelancer</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Skills</th>
                        <th>Portfolio</th>

                        <th>Hourly_Rate</th>
                        <th>Reviews</th>
                        <th>Ratings</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {freelancer.map((user, key) =>
                        <tr key={key}>
                            <td>{user.Freelancer_ID}</td>
                            <td>{user.name}</td>
                            <td>{user.Skills}</td>
                            <td>{user.Portfolio}</td>
                            <td>{user.Hourly_Rate}</td>
                            <td>{user.Reviews}</td>
                            <td>{user.Ratings}</td>
                            <td>
                                <Link to={`/user/${user.Freelancer_ID}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                <button onClick={() => deleteUser(user.Freelancer_ID)}>Delete</button>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    )
}
