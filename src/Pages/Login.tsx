import { useEffect, useState } from 'react'
import '../Stylesheets/Login&Signup.css'
import { useStore } from '../Stores/store';
import { observer } from 'mobx-react-lite';
import SpinnerButton from '../Helpers/SpinnerButton';

const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [disabled, setDisabled] = useState<boolean>(false)

    const { accountStore } = useStore();
    const { login, isLoading, loggedInUser } = accountStore;

    const togglePassword = (event: React.FormEvent) => {
        event.preventDefault()
        setShowPassword(!showPassword)
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        login({
            email: email,
            password: password
        })
    }

    useEffect(() => {
        if (loggedInUser) {
            setDisabled(true)
        }
    }, [])

    return (
        <div id='loginContainr'>
            <div id='content'>
                <form className='formContainerLogin' onSubmit={handleSubmit}>
                    <h1 className='text-center text-success mb-4'>LOGIN</h1>
                    <div className="mt-2 form-group">
                        <label htmlFor="emailLoginField" className="form-label">Email address</label>
                        <input
                            type='text'
                            disabled={isLoading || disabled}
                            className="form-control"
                            id="emailLoginField"
                            autoComplete='false'
                            placeholder="Password..."
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="mt-3 form-group">
                        <label htmlFor="passwordLoginField" className="form-label">Password</label>
                        <div className="d-flex justify-content-center">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                disabled={isLoading || disabled}
                                className="form-control"
                                id="passwordLoginField"
                                autoComplete='false'
                                placeholder="Password..."
                                onChange={(e) => setPassword(e.target.value)} />

                            <button className='btn btn-success'
                                onClick={(event: React.FormEvent) => togglePassword(event)} disabled={disabled}>
                                <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 form-group">
                        <button className='btn btn-success form-control' id="submitButton" type='submit'
                            disabled={isLoading || disabled}>
                            {!isLoading ? 'Log In' : <SpinnerButton />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default observer(Login)