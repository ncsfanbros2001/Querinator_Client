import { useEffect, useRef, useState } from 'react'
import { useStore } from '../Stores/store';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import '../Stylesheets/Query_Executer.css'

const QueryExecuter = () => {
    const [queryString, setQueryString] = useState<string>("");
    const [queryTitle, setQueryTitle] = useState<string>("");
    const [saveMode, setSaveMode] = useState<boolean>(false);

    const { queryStore } = useStore()
    const { executeQuery, saveQuery, isLoading } = queryStore

    const navigate = useNavigate()
    const param = useParams()

    const queryInputField = useRef(null)

    useEffect(() => {
        if (param.query != null) {
            setQueryString(param.query);
            (queryInputField.current as any).value = param.query;
            executeQuery(param.query);
        }
    }, [])

    return (
        <>
            <div className='form-group d-flex justify-content-center p-2'>
                <h2 className='text-success mx-2'>YOUR QUERY:</h2>

                <input type='text' className='form-control w-50' style={{ height: 40, marginRight: '10px', paddingLeft: '10px' }}
                    onChange={(e) => setQueryString(e.target.value)} ref={queryInputField} disabled={saveMode} id="queryInput" />
            </div>

            <div className='form-group d-flex justify-content-center p-2'>
                <button className='btn btn-success' disabled={queryString == '' || isLoading} style={{ height: 40 }}
                    onClick={() => executeQuery(queryString)}>
                    <i className="bi bi-lightning"></i> Execute
                </button>

                <button className='btn btn-primary mx-2' disabled={queryString == '' || isLoading} style={{ height: 40 }}
                    data-bs-toggle="collapse" data-bs-target="#saveQueryAccordion" onClick={() => setSaveMode(!saveMode)}>
                    <i className="bi bi-floppy"></i> Save Query
                </button>

                <button className='btn btn-warning' style={{ height: 40 }} onClick={() => navigate('/recommend')}>
                    <i className="bi bi-list-columns"></i>  Go To Query Recommedations
                </button>
            </div>

            <div className="d-flex justify-content-center m-3">
                <div className="collapse w-50" id="saveQueryAccordion">
                    <div className="d-flex justify-content-center">
                        <input type='text' className='form-control w-75' id="queryTitle" placeholder='Your query title...'
                            onChange={(e) => setQueryTitle(e.target.value)} />

                        <button className='btn btn-primary mx-2 w-25' disabled={queryTitle == ''}
                            onClick={() => saveQuery({ title: queryTitle, query: queryString })}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(QueryExecuter)