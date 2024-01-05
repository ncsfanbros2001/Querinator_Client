import { useEffect, useState } from 'react'
import '../Stylesheets/Login&Signup.css'
import { useStore } from '../Stores/store';
import { observer } from 'mobx-react-lite';
import SpinnerButton from '../Helpers/SpinnerButton';
import { UserRoles } from '../utilities/Statics';

const CreateUser = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { accountStore } = useStore()
    const { isAccountLoading, register, triggerUnauthorized, loggedInUser, errors, setErrors } = accountStore

    const [roleList, setRoleList] = useState<string[]>([])

    const [displayName, setDisplayName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const togglePassword = (event: React.FormEvent) => {
        event.preventDefault()
        setShowPassword(!showPassword)
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        register({
            displayName: displayName,
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            role: role
        })
    }

    useEffect(() => {
        for (let item in UserRoles) {
            if (isNaN(Number(item))) {
                roleList.push(item);
            }
        }

        setErrors([])

        if (!loggedInUser || loggedInUser.role !== UserRoles.admin) {
            triggerUnauthorized()
        }
    }, [])

    return (
        <div id='registerContainr'>
            <div id='content'>
                <form className='formContainerSignup' onSubmit={handleSubmit}>
                    <h1 className='text-center text-success mb-4'>CREATE NEW USER</h1>

                    <div className="container">
                        <div className="row mt-2">
                            <div className="form-group">
                                <label htmlFor="emailLoginField" className="form-label">Email Address</label>
                                <input
                                    disabled={isAccountLoading}
                                    type="text"
                                    className="form-control"
                                    id="emailLoginField"
                                    autoComplete='false'
                                    placeholder="Email..."
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            {errors.length > 0 && errors.filter((error: string) => error.toLowerCase().includes('email'))
                                .map((item: string, key: number) => (
                                    <span className='validationError' key={key}>{item}</span>
                                ))}
                        </div>

                        <div className="row mt-3">
                            <div className="form-group">
                                <label htmlFor="emailLoginField" className="form-label">Display Name</label>
                                <input
                                    disabled={isAccountLoading}
                                    type="text"
                                    className="form-control"
                                    id="displayNameLoginField"
                                    autoComplete='false'
                                    placeholder="Display Name..."
                                    onChange={(e) => setDisplayName(e.target.value)} />
                            </div>

                            {errors.length > 0 && errors.filter((error: string) => error.toLowerCase().includes('displayname'))
                                .map((item: string, key: number) => (
                                    <span className='validationError' key={key}>{item}</span>
                                ))}
                        </div>

                        <div className="row mt-3">
                            <div className="form-group">
                                <label htmlFor="emailLoginField" className="form-label">User Role</label>
                                <select className='form-control connectionSelect' onChange={(e) => setRole(e.target.value)}>
                                    <option disabled selected value="">---Roles---</option>
                                    {roleList.length > 0 && roleList.map((item: string, key: number) => (
                                        <option key={key}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group">
                                <label htmlFor="emailLoginField" className="form-label">Username</label>
                                <input
                                    disabled={isAccountLoading}
                                    type="text"
                                    className="form-control"
                                    id="usernameLoginField"
                                    autoComplete='false'
                                    placeholder="Username..."
                                    onChange={(e) => setUsername(e.target.value)} />
                            </div>

                            {errors.length > 0 && errors.filter((error: string) => error.toLowerCase().includes('username'))
                                .map((item: string, key: number) => (
                                    <div key={key}>
                                        <span className='validationError'>{item}</span>
                                    </div>
                                ))}
                        </div>

                        <div className="row mt-3">
                            <div className="form-group col-md-6">
                                <label htmlFor="passwordLoginField" className="form-label">Password</label>
                                <div>
                                    <input
                                        disabled={isAccountLoading}
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="passwordLoginField"
                                        autoComplete='false'
                                        placeholder="Password..."
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                {errors.length > 0 && errors.filter((error: string) => error.toLowerCase().includes('password')
                                    && !error.toLowerCase().includes('confirm'))
                                    .map((item: string, key: number) => (
                                        <span className='validationError' key={key}>{item}</span>
                                    ))}
                            </div>


                            <div className="form-group col-md-6 confirmRegion">
                                <label htmlFor="passwordLoginField" className="form-label">Confirm Password</label>
                                <div className="d-flex justify-content-center">
                                    <input
                                        disabled={isAccountLoading}
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="confirmPasswordLoginField"
                                        autoComplete='false'
                                        placeholder="Confirm Password..."
                                        onChange={(e) => setConfirmPassword(e.target.value)} />

                                    <button className='btn btn-success' disabled={isAccountLoading}
                                        onClick={(event: React.FormEvent) => togglePassword(event)}>
                                        <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                    </button>
                                </div>

                                {errors.length > 0 && errors.filter((error: string) => error.toLowerCase().includes('confirm'))
                                    .map((item: string, key: number) => (
                                        <span className='validationError' key={key}>{item}</span>
                                    ))}
                            </div>
                        </div>

                        <div className="row">
                            <div className="mt-4 form-group">
                                <button id="submitButton" type='submit' disabled={isAccountLoading}>
                                    {!isAccountLoading ? 'Create' : <SpinnerButton />}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default observer(CreateUser)   