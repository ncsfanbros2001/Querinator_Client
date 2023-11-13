import { useNavigate } from "react-router-dom"
import { SavedQuery } from "../models/SavedQuery"
import '../Stylesheets/Collapsable.css'
import Spinner from "../Helpers/Spinner"

interface Props {
    savedQueries: SavedQuery[] | undefined
    queryGroupName: string
    isLoading: boolean
}

const Collapsable = ({ savedQueries, queryGroupName, isLoading }: Props) => {
    const navigate = useNavigate()

    const executeQuery = (query: string) => {
        navigate(`/query/${query}`)
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

                    <div id={setAccordionId(queryGroupName)} className="accordion-collapse collapse">
                        {isLoading && <Spinner />}

                        {savedQueries !== undefined && savedQueries.length > 0
                            ? savedQueries.map((item: SavedQuery, key: number) => (
                                <div className="accordion-body d-flex flex-row justify-content-between" key={key}>
                                    <div style={{ width: '80%' }} className="p-1">
                                        <h5>{item.title}</h5>
                                    </div>

                                    <div className="d-flex justify-content-end" style={{ width: '15%' }}>
                                        <button className='btn btn-success' onClick={() => executeQuery(item.query)}>
                                            <i className="bi bi-lightning"></i> Execute
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center p-2">
                                    <h3>You don't have any saved query yet</h3>
                                </div>
                            )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Collapsable