import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const {Freelancer_ID} = useParams();

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`http://localhost/api1/user/${Freelancer_ID}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost/api1/user/${Freelancer_ID}/edit`, inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        
    }
    return (
        <div>
            <h1>Edit user</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Name: </label>
                            </th>
                            <td>
                                <input value={inputs.name} type="text" name="name" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Skills: </label>
                            </th>
                            <td> 
                                <input value={inputs.Skills} type="text" name="Skills" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Portfolio: </label>
                            </th>
                            <td>
                                <input value={inputs.Portfolio} type="text" name="Portfolio" onChange={handleChange} />
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label>Hourly_Rate: </label>
                            </th>
                            <td>
                                <input value={inputs.Hourly_Rate} type="text" name="Hourly_Rate" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Reviews: </label>
                            </th>
                            <td> 
                                <input value={inputs.Reviews} type="text" name="Reviews" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Ratings: </label>
                            </th>
                            <td> 
                                <input value={inputs.Ratings} type="text" name="Ratings" onChange={handleChange} />
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
