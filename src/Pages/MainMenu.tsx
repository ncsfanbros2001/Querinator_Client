import { useNavigate } from 'react-router-dom'
import '../Stylesheets/Main_Menu.css'

const MainMenu = () => {
    const navigate = useNavigate()

    return (
        <div id='containr'>
            <div id='content'>
                <h1 className='text-light'>QUERINATOR</h1>
                <button onClick={() => navigate('/query')} className='btnControl my-3 btn btn-light'>Go to Query</button>
                <button onClick={() => navigate('/recommend')} className='btnControl btn btn-outline-light'>
                    Checkout the Recommendations
                </button>
            </div>
        </div>
    )
}

export default MainMenu