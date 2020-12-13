import React, { Component, useState, useContext } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import UserContext from '../context/user-context'
import axios from 'axios'
import Header from './Header';
import Footer from './Footer';


const Login = () => {
    const { setUser } = useContext(UserContext)

    const[appLogin, setAppLogin] = useState(
        { email: '', password: '', formSubmitted: 'false' }
    );

    const[loginErrors, setloginErrors] = useState(
        { loginError: '' }
    );
    
    const handleChange = (event) => {
        setAppLogin({ ...appLogin, [event.target.name]: event.target.value })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('api/auth/login', appLogin)
                .then(function (response) {
                    console.log(response)
                    localStorage.setItem('token', response.data.access_token)
                    setAppLogin({
                        formSubmitted: true
                    })
                    const userData = JSON.parse(response.config.data)
                    console.log(userData)
                    setUser(userData)
                    this.props.history.push('/')

                })
                .catch(function (error) {
                    console.log(error)
                    setloginErrors({
                        loginError: 'Username & Password did not matched'
                    })
                })
            }
    return (
        <div> 
            {appLogin.formSubmitted === true ? <Redirect to='/' /> :
            <div>
                    <form className="form-signin" onSubmit={handleSubmit}>
                        <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                        <h1 className="h3 mb-3 font-weight-normal">Please login</h1>
                        <input type="email" name="email" id="email" className="form-control mt-2" value={appLogin.email} onChange={handleChange} placeholder="Email address" required />
                        <input type="password" name="password" id="password" className="form-control mt-2" value={appLogin.password} onChange={handleChange} placeholder="Password" required />
                        {loginErrors.loginError ? <span>{loginErrors.loginError}</span> : <span></span>}
                        <button className="btn btn-lg btn-primary btn-block mt-2" type="submit">Login</button>
                    </form>
            </div>
        }
        </div>
    );
}

export default withRouter(Login);
