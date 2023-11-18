import { useNavigate } from 'react-router-dom'
import '../Stylesheets/Main_Menu.css'
import { StaticValues } from '../utilities/Statics'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

const MainMenu = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem(StaticValues.userToken) != null) {
            console.log(jwtDecode(localStorage.getItem(StaticValues.userToken)!))
        }
    }, [])

    return (
        <div id='containr'>
            <div id='content'>
                <h1 className='text-light'>QUERINATOR</h1>

                {localStorage.getItem(StaticValues.userToken) ? (
                    <>
                        <button onClick={() => navigate('/query')} className='btnControl my-3 btn btn-light'>Go to Query</button>
                        <button onClick={() => navigate('/recommend')} className='btnControl btn btn-outline-light'>
                            Checkout the Recommendations
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate('/login')} className='btnControl my-3 btn btn-light'>Log In</button>
                        <button onClick={() => navigate('/signup')} className='btnControl btn btn-outline-light'>
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default MainMenu