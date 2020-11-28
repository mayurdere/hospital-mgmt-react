import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'


const Appointment = () => {
    const [appointment, setAppointment] = useState({
        name: "",
        date: "",
        time: "",
        blood_group: "",
        gender: "",
        illness:"",
        phone:""
    })

    useEffect(() => {
        loadUser()
    }, [])

    const { id } = useParams()
    const loadUser = async () => {
        const result = await axios.get(`/api/appointment/${id}`)
        setAppointment(result.data)
    }
    return (
        <div>
            <div className="card ml-5 ">
                <div className="py-4 card-header w-600">
                    Appointment Details
                </div>
                <ul className="list-group w-100">
                    <li className="list-group-item">ID: {appointment.id}</li>
                    <li className="list-group-item">Name: {appointment.name}</li>
                    <li className="list-group-item">Date: {appointment.date}</li>
                    <li className="list-group-item">Time: {appointment.time}</li>
                    <li className="list-group-item">Blood Group: {appointment.blood_group}</li>
                    <li className="list-group-item">Gender: {appointment.gender}</li>
                    <li className="list-group-item">Illness: {appointment.illness}</li>
                    <li className="list-group-item">Phone: {appointment.phone}</li>
                </ul>
            </div>
        </div>

    );
}

export default Appointment;