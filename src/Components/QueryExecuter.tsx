import '../Stylesheets/Query_Executer.css'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '../Stores/store';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import SpinnerButton from '../Helpers/SpinnerButton';

const QueryExecuter = () => {
    const [queryString, setQueryString] = useState<string>("");
    const [queryTitle, setQueryTitle] = useState<string>("");
    const [saveMode, setSaveMode] = useState<boolean>(false);

    const { queryStore, accountStore, connectionStore } = useStore()
    const { executeQuery, saveQuery, isQueryLoading } = queryStore
    const { loggedInUser } = accountStore
    const { currentServerAndDb, getCurrentServerAndDb, isConnectionLoading } = connectionStore

    const navigate = useNavigate()
    const param = useParams()

    const queryInputField = useRef(null)

    useEffect(() => {
        getCurrentServerAndDb(loggedInUser!.id)

        if (param.query != null) {
            const pr = JSON.parse(decodeURIComponent(param.query))
            setQueryString(pr.query);
            (queryInputField.current as any).value = pr.query;
        }
    }, [])

    const execute = () => {
        executeQuery({
            query: queryString,
            userId: loggedInUser?.id!
        })
    }

    return (
        <div className='d-flex justify-content-center' id="queryExecuterContainter">
            <div className='form-group mt-3' id="inputRegion">

                <div className='d-flex justify-content-between mx-1 header'>
                    <h2 className='text-success ml-1'>YOUR QUERY:</h2>

                    <div className='connectionStatus'>
                        {isConnectionLoading ? (<SpinnerButton />) : (
                            <span>
                                <b>Server:</b> {currentServerAndDb.server} <b>Database:</b> {currentServerAndDb.database}
                            </span>
                        )}
                    </div>

                </div>

                <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setQueryString(e.target.value)}
                    ref={queryInputField} disabled={saveMode || isQueryLoading}
                    id="queryInput"
                    placeholder='Query goes here ...' />

                <div className="collapse" id="saveQueryAccordion">
                    <div className="d-flex justify-content-center">
                        <input type='text' className='form-control w-75' id="queryTitle" placeholder='Your query title...'
                            onChange={(e) => setQueryTitle(e.target.value)} disabled={isQueryLoading} />

                        <button className='btn btn-primary mx-2 w-25' disabled={queryTitle === ''}
                            onClick={() => saveQuery({ title: queryTitle, query: queryString, userId: loggedInUser!.id })}>
                            Save
                        </button>
                    </div>
                </div>
            </div>

            <div className="barricade"></div>

            <div className='col-md-3 col-sm-12'>
                <div id="btnRegion">
                    <button
                        className='btn btn-success operateBtn'
                        disabled={queryString === '' || isQueryLoading}
                        onClick={() => execute()}>
                        <i className="bi bi-lightning"></i> Execute
                    </button>

                    <button
                        className='btn btn-primary operateBtn'
                        disabled={queryString === '' || isQueryLoading}
                        data-bs-toggle="collapse"
                        data-bs-target="#saveQueryAccordion"
                        onClick={() => setSaveMode(!saveMode)}>
                        <i className="bi bi-floppy"></i> Save Query
                    </button>

                    <button
                        className='btn btn-warning operateBtn'
                        disabled={isQueryLoading}
                        onClick={() => navigate('/recommend')}>
                        <i className="bi bi-list-columns"></i>  Go To Query Recommedations
                    </button>

                    <button
                        className='btn btn-purple operateBtn'
                        disabled={isQueryLoading}
                        onClick={() => navigate('/databaseConnection')}>
                        <i className="bi bi-database-gear"></i>  Database Connection
                    </button>
                </div>
            </div>
        </div>
    )
}

export default observer(QueryExecuter)