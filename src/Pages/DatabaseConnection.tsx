import { useRef, useState } from "react"
import "../Stylesheets/Database_Connection.css"
import { useStore } from "../Stores/store";
import { observer } from "mobx-react-lite";
import SpinnerButton from "../Helpers/SpinnerButton";
import { toast } from "react-toastify";

const DatabaseConnection = () => {
    const [isLocked, setIsLocked] = useState<boolean>(true);
    const [requiresCredentials, setRequiresCredentials] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [serverName, setServerName] = useState<string>('');
    const [databaseName, setDatabaseName] = useState<string>('');
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const usernameField = useRef(null)
    const passwordField = useRef(null)

    const { connectionStore } = useStore();
    const { setDbConnection, servers, databases, isLoading } = connectionStore

    const setConnection = async () => {
        if (isLocked === false) {
            if (username !== '' || password !== '') {
                setDbConnection({
                    serverName: serverName,
                    databaseName: databaseName,
                    username: username,
                    password: password
                })
            }
            else {
                toast.error("Username and password are required")
            }
        }
        setIsLocked(!isLocked)
    }

    return (
        <div id='connectionContainr'>
            <div id='connectionContent'>
                <h1 className="text-success m-2">DATABASE CONNECTION STRING</h1>


                <div className="row connectionRow m-3">
                    <select className='form-control connectionSelect' disabled={isLocked}
                        onChange={(e) => {
                            setServerName(e.target.value)
                        }}>

                        <option disabled selected value="">---Server---</option>
                        {servers.length > 0 && servers.map((item: string, key: number) => (
                            <option key={key}>{item}</option>
                        ))}
                    </select>
                </div>


                <div className="row connectionRow m-3">
                    <select className='form-control connectionSelect' disabled={isLocked} placeholder="database"
                        onChange={(e) => setDatabaseName(e.target.value)}>

                        <option disabled selected value="">---Databases---</option>
                        {databases.length > 0 && databases.map((item: string, key: number) => (
                            <option key={key}>{item}</option>
                        ))}
                    </select>
                </div>


                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" style={{ zoom: 1.4 }}
                        disabled={serverName === '' || databaseName === ''}
                        onChange={() => {
                            if (requiresCredentials === true) {
                                setUserName('');
                                setPassword('');

                                (usernameField.current as any).value = '';
                                (passwordField.current as any).value = '';
                            }
                            setRequiresCredentials(!requiresCredentials)
                        }} />

                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked" style={{ fontSize: '20px' }}>
                        SQL Server Authentication
                    </label>
                </div>



                <div className="row connectionRow m-3 form-group">
                    <div className="col-6">
                        <input type="text" className='form-control' disabled={!requiresCredentials} placeholder="Username..."
                            onChange={(e) => setUserName(e.target.value)} ref={usernameField} />
                    </div>


                    <div className="col-6 d-flex justify-content-center">
                        <input type={showPassword ? 'text' : 'password'} className='form-control' disabled={!requiresCredentials}
                            placeholder="Password..." onChange={(e) => setPassword(e.target.value)} ref={passwordField} />

                        <button className="btn btn-success mx-2" onClick={() => setShowPassword(!showPassword)}>
                            <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                        </button>
                    </div>
                </div>


                <div className="form-group">
                    <button className={`btn ${isLocked ? 'btn-success' : 'btn-primary'} form-control`} disabled={isLoading}
                        id="setConnection" onClick={() => setConnection()}>
                        {!isLoading ? 'Setup Connection' : <SpinnerButton />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default observer(DatabaseConnection)