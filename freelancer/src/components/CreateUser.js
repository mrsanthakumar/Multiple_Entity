import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost/api1/user/save', inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        
    }
    return (
        <div>
            <h1>Create user</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Name: </label>
                            </th>
                            <td>
                                <input type="text" name="name" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Skills: </label>
                            </th>
                            <td> 
                                <input type="text" name="Skills" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Portfolio: </label>
                            </th>
                            <td>
                                <input type="text" name="Portfolio" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Hourly_Rate: </label>
                            </th>
                            <td>
                                <input type="text" name="Hourly_Rate" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Reviews: </label>
                            </th>
                            <td> 
                                <input type="text" name="Reviews" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Ratings: </label>
                            </th>
                            <td> 
                                <input type="text" name="Ratings" onChange={handleChange} />
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
