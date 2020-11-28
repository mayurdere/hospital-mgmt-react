import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'


const Patient = () => {
    const [patient, setAppointment] = useState({
        name: "",
        age:"",
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
        const result = await axios.get(`/api/patients/${id}`)
        setAppointment(result.data)
    }
    return (
        <div>
            <div className="card ml-5 ">
                <div className="py-4 card-header w-600">
                    Patient Details
                </div>
                <ul className="list-group w-100">
                    <li className="list-group-item">ID: {patient.id}</li>
                    <li className="list-group-item">Name: {patient.name}</li>
                    <li className="list-group-item">Date: {patient.age}</li>
                    <li className="list-group-item">Blood Group: {patient.blood_group}</li>
                    <li className="list-group-item">Gender: {patient.gender}</li>
                    <li className="list-group-item">Illness: {patient.illness}</li>
                    <li className="list-group-item">Phone: {patient.phone}</li>
                </ul>
            </div>
        </div>

    );
}

export default Patient;