import React, { useEffect, useState } from 'react'
import '../Stylesheets/Login&Signup.css'
import SpinnerButton from '../Helpers/SpinnerButton';
import { observer } from 'mobx-react-lite';
import { useStore } from '../Stores/store';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);

    const { accountStore } = useStore()
    const { changeUserPassword, loggedInUser, isAccountLoading, errors, setErrors, userToken, triggerUnauthorized } = accountStore

    const handleSubmit = (event: any) => {
        event.preventDefault();
        changeUserPassword({
            userId: loggedInUser?.id!,
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword
        })
    }

    useEffect(() => {
        setErrors([])

        if (!userToken) {
            triggerUnauthorized()
        }
    }, [])

    return (
        <div id='registerContainr'>
            <div id='content'>
                <form className='formContainerSignup' onSubmit={handleSubmit}>
                    <h1 className='text-center text-success mb-4'>CHANGE PASSWORD</h1>
                    <div className='passwordHint w-100'>
                        <span>
                            Hint: Password must contain at least 1 Number, 1 uppercase letter,
                            1 special character and length must be longer than 8
                        </span>
                    </div>

                    <div className="container">
                        <div className="row mt-3">
                            <div className="form-group">
                                <label htmlFor="oldPassField" className="form-label">Old Password</label>
                                <div className="d-flex justify-content-center">
                                    <input
                                        disabled={isAccountLoading}
                                        type={showOldPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="emailLoginField"
                                        autoComplete='false'
                                        placeholder="Old password..."
                                        onChange={(e) => setOldPassword(e.target.value)} />

                                    <button className='btn btn-success mx-2'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setShowOldPassword(!showOldPassword)
                                        }}>
                                        <i className={showOldPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                    </button>
                                </div>

                                {errors.length > 0 && errors.filter((error: string) => error.toLowerCase().includes('old'))
                                    .map((item: string, key: number) => (
                                        <span className='validationError' key={key}>{item}</span>
                                    ))}
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group">
                                <label htmlFor="newPassField" className="form-label">New Password</label>
                                <div className="d-flex justify-content-center">
                                    <input
                                        disabled={isAccountLoading}
                                        type={showNewPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="newPassField"
                                        autoComplete='false'
                                        placeholder="New password..."
                                        onChange={(e) => setNewPassword(e.target.value)} />

                                    <button className='btn btn-success mx-2'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setShowNewPassword(!showNewPassword)
                                        }}>
                                        <i className={showNewPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                    </button>
                                </div>

                                {errors.length > 0 && errors.filter((error: string) =>
                                    (error.toLowerCase().includes('new') || error.toLowerCase().includes('enough')) &&
                                    !error.toLowerCase().includes('confirm'))
                                    .map((item: string, key: number) => (
                                        <span className='validationError' key={key}>{item}</span>
                                    ))}
                            </div>
                        </div>

                        <div className="row mt-3 form-group">
                            <div className="form-group">
                                <label htmlFor="confirmNewPassField" className="form-label">Confirm new password</label>
                                <div className="d-flex justify-content-center">
                                    <input
                                        disabled={isAccountLoading}
                                        type={showConfirmNewPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="confirmNewPassField"
                                        autoComplete='false'
                                        placeholder="Confirm new password..."
                                        onChange={(e) => setConfirmNewPassword(e.target.value)} />


                                    <button className='btn btn-success mx-2'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setShowConfirmNewPassword(!showConfirmNewPassword)
                                        }}>
                                        <i className={showConfirmNewPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                    </button>
                                </div>

                                {errors.length > 0 && errors.filter((error: string) =>
                                    error.toLowerCase().includes('change') || error.toLowerCase().includes('confirm'))
                                    .map((item: string, key: number) => (
                                        <span className='validationError' key={key}>{item}</span>
                                    ))}
                            </div>
                        </div>

                        <div className="row">
                            <div className="mt-4 form-group">
                                <button id="submitButton" type='submit' disabled={isAccountLoading}>
                                    {isAccountLoading ? <SpinnerButton /> : 'Change Password'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default observer(ChangePassword)