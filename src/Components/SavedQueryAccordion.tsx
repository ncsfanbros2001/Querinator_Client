import { useNavigate } from "react-router-dom"
import { SavedQuery } from "../models/SavedQuery"
import '../Stylesheets/Accordion.css'
import UpdateModal from "./UpdateModal"
import { useState } from "react"
import { observer } from "mobx-react-lite"
import Spinner from "../Helpers/Spinner"

interface Props {
    savedQueries: SavedQuery[] | undefined
    queryGroupName: string
    isLoading: boolean
    executeQuery: any
    deleteSavedQuery: any
    loggedInUser: any
    setSavedQueries: any
}

const SavedQueryAccordion = ({ savedQueries, queryGroupName, isLoading, executeQuery, deleteSavedQuery, loggedInUser }: Props) => {
    const navigate = useNavigate()

    const [updateId, setUpdateId] = useState<string>("")
    const [updateMode, setUpdateMode] = useState<boolean>(false)

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
            <div className="accordion mx-auto w-75 m-3" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target={`#${setAccordionId(queryGroupName)}`} aria-expanded="false">
                            <b>{queryGroupName}</b>
                        </button>
                    </h2>

                    <div id={setAccordionId(queryGroupName)} className="accordion-collapse collapse accordionContainer">
                        {savedQueries !== undefined && savedQueries.length > 0 && isLoading === false
                            ? savedQueries.map((item: SavedQuery, key: number) => (
                                <div className="accordion-body d-flex flex-row justify-content-between" key={key}>
                                    <div style={{ width: '80%' }}>
                                        <h5>{item.title}</h5>
                                        <p>Server: {item.server} | Database: {item.database}</p>
                                    </div>

                                    <div className="d-flex justify-content-evenly" style={{ width: '15%' }}>
                                        <button className='btn btn-success function-button' disabled={isLoading}
                                            onClick={() => execute(item.query)}>
                                            <i className="bi bi-lightning"></i>
                                        </button>

                                        <button className='btn btn-warning function-button' disabled={isLoading} onClick={() => {
                                            setUpdateId(item.id!)
                                            setUpdateMode(true)
                                        }}
                                            data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                                            <i className="bi bi-pencil-square"></i>
                                        </button>

                                        <button className='btn btn-danger function-button' disabled={isLoading}
                                            onClick={() => {
                                                deleteSavedQuery(item.id!, loggedInUser?.id!)
                                            }}>
                                            <i className="bi bi-trash3"></i>
                                        </button>
                                    </div>
                                </div>
                            )) : savedQueries !== undefined && savedQueries.length === 0 && isLoading === false ? (
                                <div className="text-center p-2">
                                    <h3>You don't have any saved query yet</h3>
                                </div>
                            ) : (
                                <div className="text-center p-2">
                                    <Spinner />
                                </div>
                            )}
                    </div>
                </div>

                <UpdateModal queryId={updateId} updateMode={updateMode} setUpdateMode={setUpdateMode} />
            </div>
        </>
    )
}

export default observer(SavedQueryAccordion)