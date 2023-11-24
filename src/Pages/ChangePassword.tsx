import React from 'react'
import '../Stylesheets/Login&Signup.css'
import SpinnerButton from '../Helpers/SpinnerButton';
import { observer } from 'mobx-react-lite';

const ChangePassword = () => {


    const handleSubmit = (event: any) => {
        event.preventDefault();
    }

    return (
        <div id='registerContainr'>
            <div id='content'>
                <form className='formContainerSignup' onSubmit={handleSubmit}>
                    <h1 className='text-center text-success mb-4'>CHANGE PASSWORD</h1>

                    <div className="container">
                        <div className="row mt-3">
                            <div className="form-group">
                                <label htmlFor="oldPassField" className="form-label">Email Address</label>
                                <input
                                    disabled
                                    type="text"
                                    className="form-control"
                                    id="emailLoginField"
                                    autoComplete='false'
                                    placeholder="New password..." />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group">
                                <label htmlFor="newPassField" className="form-label">Email Address</label>
                                <input
                                    disabled
                                    type="text"
                                    className="form-control"
                                    id="newPassField"
                                    autoComplete='false'
                                    placeholder="New password..." />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group">
                                <label htmlFor="confirmNewPassField" className="form-label">Email Address</label>
                                <input
                                    disabled
                                    type="text"
                                    className="form-control"
                                    id="confirmNewPassField"
                                    autoComplete='false'
                                    placeholder="Confirm new password..." />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mt-4 form-group">
                                <button className='btn btn-success form-control' id="submitButton" type='submit'>
                                    Change Password
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