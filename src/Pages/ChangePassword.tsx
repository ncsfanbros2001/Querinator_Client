import React, { useEffect, useState } from 'react'
import '../Stylesheets/Login&Signup.css'
import SpinnerButton from '../Helpers/SpinnerButton';
import { observer } from 'mobx-react-lite';
import { useStore } from '../Stores/store';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

    const newPasswordErrorConditions = ['new', 'strong'];

    const { accountStore } = useStore()
    const { changeUserPassword, loggedInUser, isLoading, errors, setErrors } = accountStore

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
                                <input
                                    disabled={isLoading}
                                    type="text"
                                    className="form-control"
                                    id="emailLoginField"
                                    autoComplete='false'
                                    placeholder="Old password..."
                                    onChange={(e) => setOldPassword(e.target.value)} />

                                {errors.length > 0 && errors.filter((error: string) => error.toLowerCase().includes('old'))
                                    .map((item: string, key: number) => (
                                        <span className='validationError' key={key}>{item}</span>
                                    ))}
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group">
                                <label htmlFor="newPassField" className="form-label">New Password</label>
                                <input
                                    disabled={isLoading}
                                    type="text"
                                    className="form-control"
                                    id="newPassField"
                                    autoComplete='false'
                                    placeholder="New password..."
                                    onChange={(e) => setNewPassword(e.target.value)} />

                                {errors.length > 0 && errors.filter((error: string) =>
                                    (error.toLowerCase().includes('new') || error.toLowerCase().includes('enough')) &&
                                    !error.toLowerCase().includes('confirm'))
                                    .map((item: string, key: number) => (
                                        <span className='validationError' key={key}>{item}</span>
                                    ))}
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group">
                                <label htmlFor="confirmNewPassField" className="form-label">Confirm new password</label>
                                <input
                                    disabled={isLoading}
                                    type="text"
                                    className="form-control"
                                    id="confirmNewPassField"
                                    autoComplete='false'
                                    placeholder="Confirm new password..."
                                    onChange={(e) => setConfirmNewPassword(e.target.value)} />

                                {errors.length > 0 && errors.filter((error: string) =>
                                    error.toLowerCase().includes('change') || error.toLowerCase().includes('confirm'))
                                    .map((item: string, key: number) => (
                                        <span className='validationError' key={key}>{item}</span>
                                    ))}
                            </div>
                        </div>

                        <div className="row">
                            <div className="mt-4 form-group">
                                <button className='btn btn-success form-control' id="submitButton" type='submit' disabled={isLoading}>
                                    {isLoading ? <SpinnerButton /> : 'Change Password'}
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