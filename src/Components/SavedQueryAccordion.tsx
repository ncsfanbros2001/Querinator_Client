import { useNavigate } from "react-router-dom"
import { SavedQuery } from "../models/SavedQuery"
import '../Stylesheets/Collapsable.css'
import Spinner from "../Helpers/Spinner"
import { useStore } from "../Stores/store"
import UpdateModal from "./UpdateModal"
import { useState } from "react"
import { observer } from "mobx-react-lite"

interface Props {
    savedQueries: SavedQuery[] | undefined
    queryGroupName: string
    isLoading: boolean
}

const SavedQueryAccordion = ({ savedQueries, queryGroupName, isLoading }: Props) => {
    const navigate = useNavigate()
    const { queryStore } = useStore()
    const { deleteSavedQuery } = queryStore

    const [updateId, setUpdateId] = useState<string>("")
    const [updateMode, setUpdateMode] = useState<boolean>(false)

    const execute = (query: string) => {
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
                                            onClick={() => deleteSavedQuery(item.id!)}>
                                            <i className="bi bi-trash3"></i>
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

                <UpdateModal queryId={updateId} updateMode={updateMode} setUpdateMode={setUpdateMode} />
            </div>
        </>
    )
}

export default observer(SavedQueryAccordion)