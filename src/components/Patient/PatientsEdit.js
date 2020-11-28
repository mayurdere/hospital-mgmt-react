import axios from 'axios';
import { useHistory, Link, useParams } from 'react-router-dom'
import UserContext from '../../context/user-context'
import React, { useEffect, useState, useContext } from 'react';


const PatientsEdit = () => {
    let history = useHistory()
    const { id } = useParams();
    const [patients, setPatient] = useState({
        name: "",
        age: "",
        blood_group: "",
        gender: "",
        illness: "",
        phone: "",
        user_id: ""
    })
    const user = useContext(UserContext);

    const { name, age, blood_group, illness, gender, phone, user_id } = patients;

    const onInputChange = (e) => {
        setPatient({
            ...patients,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.put('api/patients/' + id, patients)
        history.push("/patients")
    }
    useEffect(() => {
        loadUser()
    }, [])
    const loadUser = async () => {
        const result = await axios.get('api/patients/' + id)
        setPatient(result.data)
    }
    return (
        <div>
            <div className="container border shadow">
                <div className="form-row router-heading">
                    <h1 className="display-4 col-md-6">Edit Patient</h1>
                </div>
                <form className="mt-3" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="name" className="font-weight-bold ml-1">Name</label>
                        <input type="text" onChange={e => onInputChange(e)} value={name} className="form-control" id="name" name="name" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age" className="font-weight-bold ml-1">Age</label>
                        <input type="number" onChange={e => onInputChange(e)} value={age} className="form-control" id="age" name="age" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="blood_group" className="font-weight-bold ml-1">Blood Group</label>
                        <input type="text" onChange={e => onInputChange(e)} value={blood_group} className="form-control" id="blood_group" name="blood_group" placeholder="Blood Group" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender" className="font-weight-bold ml-1">Gender</label>
                        <input type="text" onChange={e => onInputChange(e)} value={gender} className="form-control" id="gender" name="gender" placeholder="Gender" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender" className="font-weight-bold ml-1">Illness</label>
                        <input type="text" onChange={e => onInputChange(e)} value={illness} className="form-control" id="illness" name="illness" placeholder="Illness" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="font-weight-bold ml-1">Phone</label>
                        <input type="text" onChange={e => onInputChange(e)} value={phone} className="form-control" id="phone" name="phone" placeholder="Phone" />
                    </div>
                    <button type="submit" className="btn btn-outline-primary mb-4">Update</button>
                </form>

            </div>
        </div>


    );
}

export default PatientsEdit;