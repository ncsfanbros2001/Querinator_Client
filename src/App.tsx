import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MainMenu from './Pages/MainMenu';
import { ToastContainer } from 'react-toastify';

const App = () => {
    const location = useLocation();
    return (
        <>
            <Navbar />
            <ToastContainer position="bottom-right" theme="colored" />
            {location.pathname === "/" ? (<MainMenu />) : (
                <Outlet />
            )}
        </>
    )
}

export default App