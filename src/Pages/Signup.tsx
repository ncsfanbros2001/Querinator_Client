import { useState } from 'react'
import '../Stylesheets/Login&Signup.css'
import { useStore } from '../Stores/store';
import { observer } from 'mobx-react-lite';
import SpinnerButton from '../Helpers/SpinnerButton';
import { RegisterInfo } from '../models/registerInfo';

const Signup = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { accountStore } = useStore()
    const { isLoading, register } = accountStore

    const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
        displayName: '',
        username: '',
        email: '',
        password: ''
    });

    const togglePassword = (event: React.FormEvent) => {
        event.preventDefault()
        setShowPassword(!showPassword)
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        register(registerInfo)
    }

    return (
        <div id='registerContainr'>
            <div id='content'>
                <form className='formContainerSignup' onSubmit={handleSubmit}>
                    <h1 className='text-center text-success mb-4'>REGISTER</h1>

                    <div className="container">
                        <div className="row mt-2">
                            <div className="form-group">
                                <label htmlFor="emailLoginField" className="form-label">Email Address</label>
                                <input
                                    disabled={isLoading}
                                    type="text"
                                    className="form-control"
                                    id="emailLoginField"
                                    autoComplete='false'
                                    placeholder="Email..."
                                    onChange={(e) => setRegisterInfo(prev => ({
                                        ...prev,
                                        email: e.target.value
                                    }))} />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group">
                                <label htmlFor="emailLoginField" className="form-label">Display Name</label>
                                <input
                                    disabled={isLoading}
                                    type="text"
                                    className="form-control"
                                    id="displayNameLoginField"
                                    autoComplete='false'
                                    placeholder="Display Name..."
                                    onChange={(e) => setRegisterInfo(prev => ({
                                        ...prev,
                                        displayName: e.target.value
                                    }))} />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group">
                                <label htmlFor="emailLoginField" className="form-label">Username</label>
                                <input
                                    disabled={isLoading}
                                    type="text"
                                    className="form-control"
                                    id="usernameLoginField"
                                    autoComplete='false'
                                    placeholder="Username..."
                                    onChange={(e) => setRegisterInfo(prev => ({
                                        ...prev,
                                        username: e.target.value
                                    }))} />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group col-6">
                                <label htmlFor="passwordLoginField" className="form-label">Password</label>
                                <div>
                                    <input
                                        disabled={isLoading}
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="passwordLoginField"
                                        autoComplete='false'
                                        placeholder="Password..."
                                        onChange={(e) => setRegisterInfo(prev => ({
                                            ...prev,
                                            password: e.target.value
                                        }))} />
                                </div>
                            </div>


                            <div className="form-group col-6">
                                <label htmlFor="passwordLoginField" className="form-label">Confirm Password</label>
                                <div className="d-flex justify-content-center">
                                    <input
                                        disabled={isLoading}
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="confirmPasswordLoginField"
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
                                <button className='btn btn-success form-control' id="submitButton" type='submit' disabled={isLoading}>
                                    {!isLoading ? 'Sign Up' : <SpinnerButton />}
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