import { useNavigate } from 'react-router-dom'
import '../Stylesheets/Main_Menu.css'
import { StaticValues } from '../utilities/Statics'
import { useStore } from '../Stores/store'
import { observer } from 'mobx-react-lite'

const MainMenu = () => {
    const navigate = useNavigate()
    const { accountStore } = useStore()
    const { loggedInUser } = accountStore

    return (
        <div id='containr'>
            <div id='content'>
                <h1 className='title'>QUERINATOR</h1>
                {loggedInUser && (<p className='welcomeMessage'>Hello There, {loggedInUser.displayName} !</p>)}

                {localStorage.getItem(StaticValues.userToken) ? (
                    <div className="d-flex flex-column align-items-center mt-2 w-100">
                        <button onClick={() => navigate('/query')} className='btnControl my-2 btn greenBG'>
                            Go to Query
                        </button>

                        <button onClick={() => navigate('/recommend')} className='btnControl btn blueBG'>
                            Checkout the Recommendations
                        </button>

                        <button onClick={() => navigate('/databaseConnection')} className='btnControl btn purpleBG'>
                            Connection Settings
                        </button>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center mt-2 w-100 p-2">
                        <button onClick={() => navigate('/login')} className='btnControl btn greenBG'>
                            Log In
                        </button>
                    </div>
                )}
            </div>
        </div >
    )
}

export default observer(MainMenu)