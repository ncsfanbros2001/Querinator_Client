import { useEffect, useRef, useState } from "react"
import "../Stylesheets/Database_Connection.css"
import { useStore } from "../Stores/store";
import { observer } from "mobx-react-lite";
import SpinnerButton from "../Helpers/SpinnerButton";
import { toast } from "react-toastify";
import { Combobox } from 'react-widgets';
import "react-widgets/styles.css";

const DatabaseConnection = () => {
    const [isLocked, setIsLocked] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [serverName, setServerName] = useState<string>('');
    const [databaseName, setDatabaseName] = useState<string>('');
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const usernameField = useRef(null)
    const passwordField = useRef(null)

    const { connectionStore, accountStore } = useStore();
    const { setDbConnection, servers, databases, isConnectionLoading, retrieveServers,
        retrieveDatabases, currentServerAndDb, getCurrentServerAndDb, setDatabases } = connectionStore
    const { loggedInUser } = accountStore

    useEffect(() => {
        getCurrentServerAndDb(loggedInUser!.id)
        setDatabases([])

        if (servers.length === 0) {
            retrieveServers();
        }
    }, [])

    const setConnection = async () => {
        if (isLocked === false) {
            if (username === '' || password === '') {
                toast.error("Username and password are required")
            }
            else {
                setDbConnection({
                    serverName: serverName,
                    databaseName: databaseName,
                    username: username,
                    password: password,
                    belongsTo: loggedInUser!.id
                })
            }
        }
        setIsLocked(!isLocked)
    }

    const setServer = (value: string) => {
        retrieveDatabases(value);
        setServerName(value);
    }

    const setDatabase = (value: string) => {
        setDatabaseName(value);
    }

    return (
        <div id='connectionContainr'>
            <div id='connectionContent'>
                <h1 className="text-success m-2 dbConnectionTitle">DATABASE CONNECTION STRING</h1>

                <div className='connectionStatusDC m-1'>
                    {isConnectionLoading ? (<SpinnerButton />) : (
                        <span>
                            <b>Server:</b> {currentServerAndDb.server} <b>Database:</b> {currentServerAndDb.database}
                        </span>
                    )}
                </div>

                <div className="row connectionRow m-3">
                    <Combobox
                        disabled={isLocked}
                        data={servers}
                        placeholder="--Server--"
                        filter="contains"
                        onChange={setServer}
                        value={serverName} />
                </div>


                <div className="row connectionRow m-3">
                    <Combobox
                        disabled={isLocked}
                        data={databases}
                        placeholder="--Database--"
                        filter="contains"
                        onChange={setDatabase}
                        value={databaseName} />
                </div>

                <div className="row connectionRow form-group m-2">
                    <div className="col-md-6 pl-2">
                        <input type="text" className='form-control' placeholder="Username..." disabled={isLocked}
                            onChange={(e) => setUserName(e.target.value)} ref={usernameField} />
                    </div>


                    <div className="col-md-6 d-flex justify-content-center passwordRegion">
                        <input type={showPassword ? 'text' : 'password'} className='form-control' disabled={isLocked}
                            placeholder="Password..." onChange={(e) => setPassword(e.target.value)} ref={passwordField} />

                        <button className="btn btn-success mx-md-1" onClick={() => setShowPassword(!showPassword)}>
                            <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                        </button>
                    </div>
                </div>


                <div className="form-group">
                    <button style={{ backgroundColor: !isLocked ? '#006FCD' : '#107C10' }} disabled={isConnectionLoading}
                        id="setConnectionBtn" onClick={() => setConnection()}>
                        {!isConnectionLoading ? (isLocked ? 'Setup Connection' : 'Save Connection') : <SpinnerButton />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default observer(DatabaseConnection)