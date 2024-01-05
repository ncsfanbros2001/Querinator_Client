import { useEffect } from "react"
import SavedQueryAccordion from "../Components/SavedQueryAccordion"
import { useStore } from "../Stores/store"
import { observer } from "mobx-react-lite"
import QueryHistoryAccordion from "../Components/QueryHistoryAccordion"
import '../Stylesheets/Query_Recommendations.css'

const QueryRecommendations = () => {

    const { queryStore, accountStore, connectionStore } = useStore()
    const { loadSavedQueries, savedQueries, setSavedQueries, isQueryLoading, getQueryHistory, queryHistory, executeQuery,
        deleteSavedQuery, } = queryStore
    const { loggedInUser } = accountStore
    const { currentServerAndDb, getCurrentServerAndDb } = connectionStore

    useEffect(() => {
        getCurrentServerAndDb(loggedInUser!.id)

        loadSavedQueries(loggedInUser?.id!)
        getQueryHistory(loggedInUser?.id!)
    }, [])

    return (
        <>
            <div className='py-md-1 d-flex flex-column align-items-center'>
                <h1 className="mt-5 text-center text-success titleText">Query Recommendations</h1>

                <div className="d-flex justify-content-center">
                    <div className='connectionStatusQR w-md-50'>
                        <span>
                            <b>Server:</b> {currentServerAndDb.server} <b>Database:</b> {currentServerAndDb.database}
                        </span>
                    </div>
                </div>

                <div className="accordionRegion">
                    <SavedQueryAccordion savedQueries={savedQueries} queryGroupName={"Saved Queries"} isLoading={isQueryLoading}
                        loggedInUser={loggedInUser} executeQuery={executeQuery} deleteSavedQuery={deleteSavedQuery}
                        setSavedQueries={setSavedQueries} />
                </div>

                <div className="accordionRegion">
                    <QueryHistoryAccordion queryHistory={queryHistory} queryGroupName={"Query History"} isLoading={isQueryLoading}
                        executeQuery={executeQuery} loggedInUser={loggedInUser} />
                </div>
            </div>
        </>
    )
}

export default observer(QueryRecommendations)