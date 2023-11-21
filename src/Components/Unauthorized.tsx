import { useNavigate } from "react-router-dom"
import "../Stylesheets/Unauthorized.css"
import { useStore } from "../Stores/store";

const Unauthorized = () => {
    const navigate = useNavigate();
    const { accountStore } = useStore();
    const { loggedInUser } = accountStore

    return (
        <div id='containrBlock'>
            <div id='unauthorizedContent'>
                <h1 className='text-light'>You Are Unauthorized</h1>
                <p className='warningMessage'>
                    Please log in with an authorized account to access this feature
                </p>

                {!loggedInUser && (
                    <div className="d-flex justify-content-center mt-2 w-50 p-2">
                        <button onClick={() => navigate('/login')} className='btnControl btn greenBG'>
                            Log In
                        </button>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Unauthorized