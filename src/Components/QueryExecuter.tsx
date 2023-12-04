import { useEffect, useRef, useState } from 'react'
import { useStore } from '../Stores/store';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import '../Stylesheets/Query_Executer.css'

const QueryExecuter = () => {
    const [queryString, setQueryString] = useState<string>("");
    const [queryTitle, setQueryTitle] = useState<string>("");
    const [saveMode, setSaveMode] = useState<boolean>(false);

    const { queryStore, accountStore } = useStore()
    const { executeQuery, saveQuery, isLoading } = queryStore
    const { loggedInUser } = accountStore

    const navigate = useNavigate()
    const param = useParams()

    const queryInputField = useRef(null)

    useEffect(() => {
        if (param.query != null) {
            const pr = JSON.parse(decodeURIComponent(param.query))
            setQueryString(pr.query);
            (queryInputField.current as any).value = pr.query;
        }
    }, [])

    const execute = () => {
        executeQuery({
            query: queryString,
            role: loggedInUser?.role!,
            userId: loggedInUser?.id!
        })
    }

    return (
        <div className='d-flex justify-content-center mx-5'>
            <div className='form-group col-9 mt-3'>
                <h2 className='text-success ml-1'>YOUR QUERY:</h2>

                <input type='text'
                    className='form-control w-100'
                    style={{ height: 45, marginRight: '10px', paddingLeft: '10px' }}
                    onChange={(e) => setQueryString(e.target.value)}
                    ref={queryInputField} disabled={saveMode || isLoading}
                    id="queryInput"
                    placeholder='Query goes here ...' />

                <div className="collapse w-75 mt-3" id="saveQueryAccordion">
                    <div className="d-flex justify-content-center">
                        <input type='text' className='form-control w-75' id="queryTitle" placeholder='Your query title...'
                            onChange={(e) => setQueryTitle(e.target.value)} disabled={isLoading} />

                        <button className='btn btn-primary mx-2 w-25' disabled={queryTitle === ''}
                            onClick={() => saveQuery({ title: queryTitle, query: queryString, userId: loggedInUser?.id })}>
                            Save
                        </button>
                    </div>
                </div>

            </div>

            <div className='col-3'>
                <div className='d-flex flex-column align-items-start p-2'>
                    <button
                        className='btn btn-success operateBtn'
                        disabled={queryString === '' || isLoading}
                        onClick={() => execute()}>
                        <i className="bi bi-lightning"></i> Execute
                    </button>

                    <button
                        className='btn btn-primary operateBtn'
                        disabled={queryString === '' || isLoading}
                        data-bs-toggle="collapse"
                        data-bs-target="#saveQueryAccordion"
                        onClick={() => setSaveMode(!saveMode)}>
                        <i className="bi bi-floppy"></i> Save Query
                    </button>

                    <button
                        className='btn btn-warning operateBtn'
                        disabled={isLoading}
                        onClick={() => navigate('/recommend')}>
                        <i className="bi bi-list-columns"></i>  Go To Query Recommedations
                    </button>

                    <button
                        className='btn btn-purple operateBtn'
                        disabled={isLoading}
                        onClick={() => navigate('/databaseConnection')}>
                        <i className="bi bi-database-gear"></i>  Database Connection
                    </button>
                </div>
            </div>
        </div>
    )
}

export default observer(QueryExecuter)