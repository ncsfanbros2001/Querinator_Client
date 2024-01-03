import { NavLink, useNavigate } from 'react-router-dom'
import { StaticValues, UserRoles } from '../utilities/Statics';
import { useStore } from '../Stores/store';
import { observer } from 'mobx-react-lite';
import '../Stylesheets/Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();

    const { accountStore } = useStore();
    const { logout, loggedInUser } = accountStore

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark p-2" id="navControl">
                <NavLink to='/' className="navbar-brand" style={{ fontFamily: "Times New Roman, Times, serif" }} id="titleControl">
                    QUERINATOR
                </NavLink>


                <div className="navbar-collapse">
                    {localStorage.getItem(StaticValues.userToken) && (
                        <ul className="navbar-nav mr-auto" id="navItemControl">
                            <li className="nav-item">
                                <NavLink to='/query' className="nav-link">Query</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/recommend' className="nav-link">Recommendations</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/databaseConnection' className="nav-link">Database Connection</NavLink>
                            </li>
                        </ul>
                    )}
                </div>


                {!localStorage.getItem(StaticValues.userToken) ? (
                    <>
                        <button className='btn btn-success mx-1' onClick={() => navigate('/login')}>Log In</button>
                    </>
                ) : (
                    <>
                        <div className="dropdown">
                            <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <b className='mx-1'>{loggedInUser?.displayName} {loggedInUser?.role === UserRoles.admin && '(Admin)'}</b>
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    {loggedInUser?.role === UserRoles.admin && (
                                        <>
                                            <button className="dropdown-item" type="button" onClick={() => navigate('/createUser')}>
                                                <i className="bi bi-person-add"></i>  <b>Add Account</b>
                                            </button>

                                            <button className="dropdown-item" type="button" onClick={() => navigate('/userManagement')}>
                                                <i className="bi bi-people"></i>  <b>Manage Users</b>
                                            </button>

                                            <hr className="dropdown-divider" />
                                        </>
                                    )}

                                    <button className="dropdown-item" type="button" onClick={() => navigate('/changePassword')}>
                                        <i className="bi bi-c-circle"></i> <b>Change Password</b>
                                    </button>

                                    <hr className="dropdown-divider" />

                                    <button className="dropdown-item" type="button" onClick={() => logout()}>
                                        <i className="bi bi-door-open"></i>  <b>Log Out</b>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </nav>
        </div>
    )
}

export default observer(Navbar)