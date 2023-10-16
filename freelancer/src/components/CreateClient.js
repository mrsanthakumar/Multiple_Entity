import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateClient() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost/api2/user/save', inputs).then(function(response){
            console.log(response.data);
            navigate('/client');
        });
        
    }
    return (
        <div>
            <h1>Create Client</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>client_name: </label>
                            </th>
                            <td>
                                <input type="text" name="client_name" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>projects_posted: </label>
                            </th>
                            <td> 
                                <input type="text" name="projects_posted" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>payment_information: </label>
                            </th>
                            <td>
                                <input type="text" name="payment_information" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>reviews: </label>
                            </th>
                            <td>
                                <input type="text" name="reviews" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>ratings: </label>
                            </th>
                            <td> 
                                <input type="text" name="ratings" onChange={handleChange} />
                            </td>
                        </tr>
                                                
                        <tr>
                            <td colSpan="2" align ="right">
                                <button>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
