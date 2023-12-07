import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';

const App = () => {
    return (
        <div>
            <Navbar />
            <ToastContainer position="bottom-right" theme="colored" />
            <Outlet />
        </div>
    )
}

export default observer(App)