import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user-context'
import { Link } from 'react-router-dom'
import axios from 'axios';


const Appointments = () => {
    const user = useContext(UserContext);

    const [appointments, setAppointment] = useState();
    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = async () => {
        const result = await axios.get('api/appointment')
        .then(res => {
            setAppointment(res.data)
            console.log(res.data)
        }).catch(function (error) {
            console.log(error)
        })
    }

    const deleteAppointment = async (id) => {
        await axios.delete(`/api/appointment/${id}`)
        loadAppointments()
    }

    return (
        <div className="container" style={{marginBottom: "8%"}}>
            <div className="form-row router-heading">
                <h1 className="display-4 col-md-6">Appointments</h1>
                {user ?
                <Link className="mt-4 mb-4 btn btn-addRouter  btn-outline-primary" to="/appointments/add">Add Appointments</Link> 
                :
                <span></span>
                }
            </div>
            <div>
            { appointments ? <table className="table border shadow">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
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
                        appointments.map((appointment, index) => (
                            <tr key={appointment.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{appointment.name}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.blood_group}</td>
                                <td>{appointment.gender}</td>
                                <td>{appointment.illness}</td>
                                <td>{appointment.phone}</td>
                                {user ?
                                <td>
                                    <Link to={`/appointment/${appointment.id}`} className="btn"><i class="fa fa-eye" aria-hidden="true"></i></Link>
                                    <Link to={`/appointment/edit/${appointment.id}`} className="btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Link>
                                    <Link to="#" onClick={() => deleteAppointment(appointment.id)} className="btn"><i class="fa fa-trash" aria-hidden="true"></i></Link>
                                    <Link to="#" className="btn"></Link>
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

export default Appointments;