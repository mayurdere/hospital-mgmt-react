import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom'

import axios from 'axios';
import UserContext from '../context/user-context'


const HomePage = () => {

    const user = useContext(UserContext);


    return (
        
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-6" >
                        <div className="title mt-5">Fortis Hospital</div>
                        <div className="sub-title">Deep created replenish herb without night fruit day earth evening Called his green were they're fruitful to over Sea bearing sixth Earth face. Them lesser great you'll second</div>
                        {user ? 
                        <Link type="button" to="/appointments" className="appointment-btn">Book Appointment</Link>
                        : <span></span>}
                    </div>
                    <div className="col-md-6" >
                        <img height="100" className="svg" src={process.env.PUBLIC_URL + '/medicine.svg'} />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-6" >
                        <img className="svg" src={process.env.PUBLIC_URL + '/doctor.svg'} />
                    </div>
                    <div className="col-md-6" >
                        <div className="title mt-5">Patient Relationship
                    </div>
                        <div className="sub-title">Kind lesser bring said midst they're created signs made the beginni years created Beast upon whales herb seas evening she'd day green dominion evening in moved have fifth in won't in darkness fruitful god behold whos without bring created creature.</div>
                        {user ? 
                        <Link type="button" to="/patients" className="appointment-btn">Patients</Link> 
                        : <span></span>}
                    </div>
                </div>
            </div>
    );
}


export default HomePage;