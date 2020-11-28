import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user-context'
import { Link } from 'react-router-dom'
import axios from 'axios';


const Patients = () => {
    const user = useContext(UserContext);

    const [patients, setPatient] = useState();
    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        const result = await axios.get('api/patients')
            .then(res => {
                setPatient(res.data)
                console.log(res.data)
            }).catch(function (error) {
                console.log(error)
            })
    }

    const deletePatient = async (id) => {
        await axios.delete(`/api/patients/${id}`)
        loadPatients()
    }

    return (
        <div className="container" style={{ marginBottom: "8%" }}>
            <div className="form-row router-heading">
                <h1 className="display-4 col-md-6">Patients</h1>
                {user ?
                    <Link className="mt-4 mb-4 btn btn-addRouter  btn-outline-primary" to="/patients/add">Add Patients</Link>
                    :
                    <span></span>
                }
            </div>
            <div>
                {patients ? <table className="table border shadow">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Blood Group</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Illness</th>
                            <th scope="col">Phone</th>
                            {user ?
                                <th scope="col">Action</th> : <span></span>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            patients.map((patient, index) => (
                                <tr key={patient.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{patient.name}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.blood_group}</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.illness}</td>
                                    <td>{patient.phone}</td>
                                    {user ?
                                        <td>
                                            <Link to={`/patients/${patient.id}`} className="btn"><i class="fa fa-eye" aria-hidden="true"></i></Link>
                                            <Link to={`/patients/edit/${patient.id}`} className="btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Link>
                                            <Link to="#" onClick={() => deletePatient(patient.id)} className="btn"><i class="fa fa-trash" aria-hidden="true"></i></Link>
                                            <button className="btn mr-2"><i class="" aria-hidden="true"></i></button>
                                        </td> : <span></span>}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                    :
                    <div>Loading...</div>
                }
            </div>
        </div>
    );
}

export default Patients;