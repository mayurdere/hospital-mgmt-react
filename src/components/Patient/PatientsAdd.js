import axios from 'axios';
import { useHistory, Link } from 'react-router-dom'
import UserContext from '../../context/user-context'
import React, { useEffect, useState, useContext } from 'react';


const PatientsAdd = () => {
    let history = useHistory()
    const user = useContext(UserContext);

    const [patient, setPatient] = useState({
        name: "",
        age: "",
        blood_group: "",
        gender: "",
        illness:"",
        phone:"",
        user_id: ""
    })

    const { name, age, blood_group, gender, illness, phone, user_id } = patient;

    const onInputChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("api/patients", patient)
        history.push("/patients")
    }
    useEffect(() => {
        axios.post('api/auth/me')
            .then(res => {
                // setUser(res.data)
                console.log(res.data.id)
                setPatient({
                    ...patient,
                    user_id: res.data.id
                })
            }).catch(function (error) {
                console.log(error)
            })
    }, [])
    return (
        <div>
            <div className="container border shadow">
                <div className="form-row router-heading">
                    <h1 className="display-4 col-md-6">Add Patient</h1>
                </div>
                <form className="mt-3" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="name" className="font-weight-bold ml-1">Name</label>
                        <input type="text" onChange={e => onInputChange(e)} value={name} className="form-control" id="name" name="name" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age" className="font-weight-bold ml-1">Age</label>
                        <input type="number" onChange={e => onInputChange(e)} value={age} className="form-control" id="age" name="age" placeholder="Age" />
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
                        <label htmlFor="illness" className="font-weight-bold ml-1">Illness</label>
                        <input type="text" onChange={e => onInputChange(e)} value={illness} className="form-control" id="illness" name="illness" placeholder="Illness" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="font-weight-bold ml-1">Phone</label>
                        <input type="number" onChange={e => onInputChange(e)} value={phone} className="form-control" id="phone" name="phone" placeholder="Phone" />
                    </div>
                    <button type="submit" className="btn btn-outline-primary mb-4">Submit</button>
                </form>

            </div>
        </div>


    );
}

export default PatientsAdd;