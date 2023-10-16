import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListBid() {

    const [bid, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost/api3/bid/').then(function(response) {
            console.log(response.data);
            setUsers(response.data);
        });
    }

    const deleteUser = (bid_id ) => {
        axios.delete(`http://localhost/api3/user/${bid_id}/delete`).then(function(response){
            console.log(response.data);
            getUsers();
        });
    }
    return (
        <div>
            <h1>List Bid</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>B_id</th>
                        <th>freelancer_id</th>
                        <th>project_id</th>
                        <th>proposed_cost</th>
                        <th>proposed_timeline</th>
                        <th>Actions</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {bid.map((user, key) =>
                        <tr key={key}>
                            <td>{user.bid_id}</td>
                            <td>{user.freelancer_id}</td>
                            <td>{user.project_id}</td>
                            <td>{user.proposed_cost}</td>
                            <td>{user.proposed_timeline}</td>
                            <td>
                                <Link to={`user/${user.bid_id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    )
}
