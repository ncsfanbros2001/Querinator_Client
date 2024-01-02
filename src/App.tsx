import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from './Stores/store';

const App = () => {
    const { accountStore } = useStore()
    const { isTokenExpired } = accountStore

    useEffect(() => {
        isTokenExpired();
    }, [])

    return (
        <div>
            <Navbar />
            <ToastContainer position="bottom-right" theme="colored" autoClose={1500} />
            <Outlet />
        </div>
    )
}

export default observer(App)