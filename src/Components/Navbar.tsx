import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark p-2">
                <NavLink to='/' className="navbar-brand" style={{ fontFamily: "Times New Roman, Times, serif" }}>QUERINATOR</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02"
                    aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink to='/query' className="nav-link">Query</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/recommend' className="nav-link">Recommendations</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar