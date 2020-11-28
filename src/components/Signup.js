import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Signup = () => {
    const [appSignUp, setAppSignUp] = useState(
        { name: '', email: '', password: '', confirmPassword: '', formSubmitted: 'false' }
    );
    const [appSignUpErrors, setAppSignUpErrors] = useState(
        { confirmPasswordError: '' }
    );

    const handleChange = (event) => {
        setAppSignUp({ ...appSignUp, [event.target.name]: event.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (appSignUp.password === appSignUp.confirmPassword) {
            axios.post('/api/auth/signup', appSignUp)
                .then(function (response) {
                    console.log(response)
                    localStorage.setItem('token', response.data.access_token)
                    setAppSignUp({
                        formSubmitted: true
                    })
                    window.location.reload(false);
                })
                .catch(function (error) {
                    console.log(error)
                })
            } else {
                setAppSignUpErrors({
                    confirmPasswordError: 'Password not matched'
                })
            }
    }

    return (
        <div>
            { appSignUp.formSubmitted === true ? <Redirect to='/' /> :
            <form className="form-signin" onSubmit={handleSubmit}>
                <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
                <input type="text" name="name" id="name" className="form-control mt-2" value={appSignUp.name} onChange={handleChange} placeholder="Name" required autoFocus />
                <input type="email" name="email" id="email" className="form-control mt-2" value={appSignUp.email} onChange={handleChange} placeholder="Email address" required />
                <input type="password" name="password" id="password" className="form-control mt-2" value={appSignUp.password} onChange={handleChange} placeholder="Password" required />
                <input type="password" name="confirmPassword" id="confirmPassword" className="form-control mt-2" value={appSignUp.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
                {appSignUpErrors.confirmPasswordError ? <span>{appSignUpErrors.confirmPasswordError}</span> : <span></span>}
                <button className="btn btn-lg btn-primary btn-block mt-2" type="submit">Sign up</button>
            </form>
            }
        </div>
    );
}

export default Signup