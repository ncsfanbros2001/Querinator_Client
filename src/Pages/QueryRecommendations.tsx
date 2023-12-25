import { useEffect } from "react"
import SavedQueryAccordion from "../Components/SavedQueryAccordion"
import { useStore } from "../Stores/store"
import { observer } from "mobx-react-lite"
import QueryHistoryAccordion from "../Components/QueryHistoryAccordion"

const QueryRecommendations = () => {

    const { queryStore, accountStore } = useStore()
    const { loadSavedQueries, savedQueries, isQueryLoading, getQueryHistory, queryHistory } = queryStore
    const { loggedInUser } = accountStore

    useEffect(() => {
        loadSavedQueries(loggedInUser?.id!)
        getQueryHistory(loggedInUser?.id!)
    }, [])

    return (
        <>
            <div className='py-md-1'>
                <h1 className="my-5 text-center text-success">Query Recommendations</h1>

                <div className="container">
                    <SavedQueryAccordion savedQueries={savedQueries} queryGroupName={"Saved Queries"} isLoading={isQueryLoading} />
                </div>

                <div className="container">
                    <QueryHistoryAccordion queryHistory={queryHistory} queryGroupName={"Query History"} isLoading={isQueryLoading} />
                </div>
            </div>
        </>
    )
}

export default observer(QueryRecommendations)