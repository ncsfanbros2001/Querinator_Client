import { useEffect, useState } from "react"
import "../Stylesheets/Database_Connection.css"
import { useStore } from "../Stores/store";
import { observer } from "mobx-react-lite";

const DatabaseConnection = () => {
    const [isUnlocked, setIsUnlocked] = useState<boolean>(true);

    const [serverName, setServerName] = useState<string>('');
    const [databaseName, setDatabaseName] = useState<string>('');

    const { connectionStore } = useStore();
    const { setDbConnection } = connectionStore

    const setConnection = () => {
        setIsUnlocked(!isUnlocked)

        if (isUnlocked === false) {
            setDbConnection(serverName, databaseName)
        }
    }

    return (
        <div id='connectionContainr'>
            <div id='connectionContent'>
                <h1 className="text-success m-2">DATABASE CONNECTION STRING</h1>

                <div className="row connectionRow m-3">
                    <input className='form-control' disabled={isUnlocked} placeholder="Server name..."
                        onChange={(e) => setServerName(e.target.value)} />
                </div>

                <div className="row connectionRow m-3">
                    <input className='form-control' disabled={isUnlocked} placeholder="Database name..."
                        onChange={(e) => setDatabaseName(e.target.value)} />
                </div>

                <div className="form-check form-switch d-flex justify-content-center">
                    <input className="form-check-input" type="checkbox" role="switch" id="lockSwitch"
                        style={{ zoom: 2.2 }} onChange={() => setConnection()} />
                </div>
            </div>
        </div>
    )
}

export default observer(DatabaseConnection)