import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MainMenu from './Pages/MainMenu';
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { useStore } from './Stores/store';
import './Stylesheets/Loading_Screen.css'

const App = () => {
    const location = useLocation();

    return (
        <div>
            <Navbar />
            <ToastContainer position="bottom-right" theme="colored" />
            {location.pathname === "/" ? (<MainMenu />) : (
                <Outlet />
            )}
        </div>
    )
}

export default observer(App)