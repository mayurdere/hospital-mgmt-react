import axios from 'axios';
import { useHistory, Link, useParams } from 'react-router-dom'
import UserContext from '../../context/user-context'
import React, { useEffect, useState, useContext } from 'react';


const AppointmentEdit = () => {
    let history = useHistory()
    const { id } = useParams();
    const [appointment, setAppointment] = useState({
        name: "",
        date: "",
        time: "",
        blood_group: "",
        gender: "",
        illness: "",
        phone: ""
    })
    const user = useContext(UserContext);

    const { name, date, time, blood_group, illness, gender, phone } = appointment;

    const onInputChange = (e) => {
        setAppointment({
            ...appointment,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.put('api/appointment/' + id, appointment)
        history.push("/appointments")
    }
    useEffect(() => {
        loadUser()
    }, [])
    const loadUser = async () => {
        const result = await axios.get('api/appointment/' + id)
        setAppointment(result.data)
    }
    return (
        <div>
            <div className="container border shadow">
                <div className="form-row router-heading">
                    <h1 className="display-4 col-md-6">Edit Appointment</h1>
                </div>
                <form className="mt-3" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="name" className="font-weight-bold ml-1">Name</label>
                        <input type="text" onChange={e => onInputChange(e)} value={name} className="form-control" id="name" name="name" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date" className="font-weight-bold ml-1">Date</label>
                        <input type="text" onChange={e => onInputChange(e)} value={date} className="form-control" id="date" name="date" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time" className="font-weight-bold ml-1">Time</label>
                        <input type="time" onChange={e => onInputChange(e)} value={time} className="form-control" id="time" name="time" placeholder="Time" />
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

export default AppointmentEdit;