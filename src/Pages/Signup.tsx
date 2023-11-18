import { useState } from 'react'
import '../Stylesheets/Login&Signup.css'
import { useStore } from '../Stores/store';
import { LoginCredentials } from '../models/LoginCredentials';
import { observer } from 'mobx-react-lite';
import SpinnerButton from '../Helpers/SpinnerButton';

const Signup = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePassword = (event: React.FormEvent) => {
        event.preventDefault()
        setShowPassword(!showPassword)
    }

    const handleSubmit = () => {

    }

    return (
        <div id='containr'>
            <div id='content'>
                <form className='formContainerSignup' onSubmit={handleSubmit}>
                    <h1 className='text-center text-success mb-4'>REGISTER</h1>

                    <div className="container">
                        <div className="row mt-2">
                            <div className="form-group">
                                <label htmlFor="emailLoginField" className="form-label">Email Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="emailLoginField"
                                    autoComplete='false'
                                    placeholder="Email..." />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group">
                                <label htmlFor="emailLoginField" className="form-label">Display Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="displayNameLoginField"
                                    autoComplete='false'
                                    placeholder="Display Name..." />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group">
                                <label htmlFor="emailLoginField" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="usernameLoginField"
                                    autoComplete='false'
                                    placeholder="Username..." />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group col-6">
                                <label htmlFor="passwordLoginField" className="form-label">Password</label>
                                <div className="d-flex justify-content-center">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="passwordLoginField"
                                        autoComplete='false'
                                        placeholder="Password..." />

                                    <button className='btn btn-success' onClick={(event: React.FormEvent) => togglePassword(event)}>
                                        <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                    </button>
                                </div>
                            </div>


                            <div className="form-group col-6">
                                <label htmlFor="passwordLoginField" className="form-label">Password</label>
                                <div className="d-flex justify-content-center">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="passwordLoginField"
                                        autoComplete='false'
                                        placeholder="Confirm Password..." />

                                    <button className='btn btn-success' onClick={(event: React.FormEvent) => togglePassword(event)}>
                                        <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="mt-4 form-group">
                                <button className='btn btn-success form-control' id="submitButton" type='submit'>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default observer(Signup)   