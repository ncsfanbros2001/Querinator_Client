import { useState } from 'react'
import '../Stylesheets/Login&Signup.css'
import { useStore } from '../Stores/store';
import { LoginCredentials } from '../models/LoginCredentials';
import { observer } from 'mobx-react-lite';
import SpinnerButton from '../Helpers/SpinnerButton';

const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: '',
        password: ''
    });

    const { accountStore } = useStore();
    const { login, isLoading } = accountStore;

    const togglePassword = (event: React.FormEvent) => {
        event.preventDefault()
        setShowPassword(!showPassword)
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()

        login(credentials)
    }

    return (
        <div id='containr'>
            <div id='content'>
                <form className='formContainerLogin' onSubmit={handleSubmit}>
                    <h1 className='text-center text-success mb-4'>LOGIN</h1>
                    <div className="mt-2 form-group">
                        <label htmlFor="emailLoginField" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            disabled={isLoading}
                            id="emailLoginField"
                            autoComplete='false'
                            placeholder="Email"
                            onChange={(e) => setCredentials(prev => ({
                                ...prev,
                                email: e.target.value
                            }))} />
                    </div>

                    <div className="mt-3 form-group">
                        <label htmlFor="passwordLoginField" className="form-label">Password</label>
                        <div className="d-flex justify-content-center">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                disabled={isLoading}
                                className="form-control"
                                id="passwordLoginField"
                                autoComplete='false'
                                placeholder="Password..."
                                onChange={(e) => setCredentials(prev => ({
                                    ...prev,
                                    password: e.target.value
                                }))} />

                            <button className='btn btn-success' onClick={(event: React.FormEvent) => togglePassword(event)}>
                                <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 form-group">
                        <button className='btn btn-success form-control' id="submitButton" type='submit' disabled={isLoading}>
                            {!isLoading ? 'Log In' : <SpinnerButton />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default observer(Login)