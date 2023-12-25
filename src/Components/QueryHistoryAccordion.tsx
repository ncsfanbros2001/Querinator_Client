import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import '../Stylesheets/Accordion.css'
import { QueryHistory } from '../models/QueryHistory'
import { useStore } from '../Stores/store'

interface Props {
    queryHistory: QueryHistory[]
    queryGroupName: string
    isLoading: boolean
}

const QueryHistoryAccordion = ({ queryHistory, queryGroupName, isLoading }: Props) => {
    const navigate = useNavigate();
    const { queryStore, accountStore } = useStore()
    const { executeQuery } = queryStore
    const { loggedInUser } = accountStore

    const execute = (query: string) => {
        executeQuery({
            query: query,
            role: loggedInUser?.role!,
            userId: loggedInUser?.id!
        });

        const queryString = {
            query: query
        }

        var encodedData = encodeURIComponent(JSON.stringify(queryString));
        navigate(`/query/${encodedData}`)
    }

    const setAccordionId = (groupName: string) => {
        return groupName.toLowerCase().replace(/\s/g, "")
    }

    return (
        <>
            <div className="accordion mx-auto w-75 m-4" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target={`#${setAccordionId(queryGroupName)}`} aria-expanded="false">
                            <b>{queryGroupName}</b>
                        </button>
                    </h2>

                    <div id={setAccordionId(queryGroupName)} className="accordion-collapse collapse accordionContainer">
                        {queryHistory.length > 0 ? queryHistory.map((item: QueryHistory, key: number) => (
                            <div className="accordion-body d-flex flex-row justify-content-between" key={key}>
                                <div style={{ width: '80%' }} className="p-1">
                                    <h5 className="queryTitle">{item.query}</h5>
                                </div>

                                <div className="d-flex justify-content-end" style={{ width: '35%' }}>
                                    <button className='btn btn-success function-button' disabled={isLoading}
                                        onClick={() => execute(item.query)}>
                                        <i className="bi bi-lightning"></i>
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center p-2">
                                <h3>History unavailable</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(QueryHistoryAccordion)