import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateBid() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost/api3/user/save', inputs).then(function(response){
            console.log(response.data);
            navigate('/');
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
                                <label>freelancer_id: </label>
                            </th>
                            <td>
                                <input type="text" name="freelancer_id" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>project_id: </label>
                            </th>
                            <td> 
                                <input type="text" name="project_id" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>proposed_cost: </label>
                            </th>
                            <td>
                                <input type="text" name="proposed_cost" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>proposed_timeline: </label>
                            </th>
                            <td>
                                <input type="text" name="proposed_timeline" onChange={handleChange} />
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
