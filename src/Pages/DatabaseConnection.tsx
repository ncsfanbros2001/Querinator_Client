import { useEffect, useState } from "react"
import "../Stylesheets/Database_Connection.css"
import { useStore } from "../Stores/store";
import { observer } from "mobx-react-lite";
import { ServerList } from "../models/ServerList";

const DatabaseConnection = () => {
    const [isUnlocked, setIsUnlocked] = useState<boolean>(true);

    const [serverName, setServerName] = useState<string>('');
    const [databaseName, setDatabaseName] = useState<string>('');

    const { connectionStore } = useStore();
    const { isLoading, serverList } = connectionStore

    useEffect(() => {
        console.log(databaseName)
    }, [databaseName])

    return (
        <div id='connectionContainr'>
            <div id='connectionContent'>
                <h1 className="text-success m-2">DATABASE CONNECTION STRING</h1>

                <div className="row connectionRow m-3">
                    <select className='form-control connectionSelect' disabled={isUnlocked}>
                        <option disabled selected={serverName === ''}>--Server--</option>
                    </select>
                </div>

                <div className="row connectionRow m-3">
                    <select className='form-control connectionSelect' disabled={isUnlocked} value={databaseName}
                        onChange={(e) => setDatabaseName(e.target.value)}>
                        <option disabled selected={databaseName === ''}>--Database--</option>
                        {serverList.length > 0 && serverList.map((item: ServerList, key: number) => (
                            <option key={key}>{item.dbName}</option>
                        ))}
                    </select>
                </div>

                <div className="form-check form-switch d-flex justify-content-center">
                    <input className="form-check-input" type="checkbox" role="switch" id="lockSwitch"
                        style={{ zoom: 2.2 }} onChange={() => setIsUnlocked(!isUnlocked)} />
                </div>
            </div>
        </div>
    )
}

export default observer(DatabaseConnection)