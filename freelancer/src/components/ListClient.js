import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListClient() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients();
  }, []);

  function getClients() {
    axios.get('http://localhost/api2/client/').then(function(response) {
      setClients(response.data);
    });
  }

  const deleteClient = (client_id) => {
    axios.delete(`http://localhost/api2/client/${client_id}`).then(function(response){
      getClients();
    });
  }

  return (
    <div>
      <h1>List Client</h1>
      <table border="1">
        <thead>
          <tr>
            <th>#</th>
            <th>client_name</th>
            <th>projects_posted</th>
            <th>payment_information</th>
            <th>reviews</th>
            <th>ratings</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, key) =>
            <tr key={key}>
              <td>{client.client_id}</td>
              <td>{client.client_name}</td>
              <td>{client.projects_posted}</td>
              <td>{client.payment_information}</td>
              <td>{client.reviews}</td>
              <td>{client.ratings}</td>
              <td>
                <Link to={`/client-edit/${client.client_id}`} style={{marginRight: "10px"}}>Edit</Link>
                <button onClick={() => deleteClient(client.client_id)}>Delete</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
