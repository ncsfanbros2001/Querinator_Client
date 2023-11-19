import { NavLink, useNavigate } from 'react-router-dom'
import { StaticValues } from '../utilities/Statics';
import { useStore } from '../Stores/store';

const Navbar = () => {
    const navigate = useNavigate();

    const { accountStore } = useStore();
    const { logout } = accountStore

    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark p-2">
                <NavLink to='/' className="navbar-brand" style={{ fontFamily: "Times New Roman, Times, serif" }}>
                    QUERINATOR
                </NavLink>


                <div className="collapse navbar-collapse" id="navbarsExample02">
                    {localStorage.getItem(StaticValues.userToken) && (
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink to='/query' className="nav-link">Query</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/recommend' className="nav-link">Recommendations</NavLink>
                            </li>
                        </ul>
                    )}
                </div>


                {!localStorage.getItem(StaticValues.userToken) ? (
                    <div>
                        <button className='btn btn-success mx-1' onClick={() => navigate('/login')}>Log In</button>
                        <button className='btn btn-primary mx-1' onClick={() => navigate('/signup')}>Sign Up</button>
                    </div>
                ) : (
                    <div>
                        <button className='btn btn-success mx-1' onClick={() => logout()}>Log Out</button>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Navbar