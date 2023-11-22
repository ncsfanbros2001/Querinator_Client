import { useEffect } from "react"
import SavedQueryAccordion from "../Components/SavedQueryAccordion"
import { useStore } from "../Stores/store"
import { observer } from "mobx-react-lite"

const QueryRecommendations = () => {

    const { queryStore, accountStore } = useStore()
    const { loadSavedQueries, savedQueries, isLoading } = queryStore
    const { loggedInUser } = accountStore

    useEffect(() => {
        loadSavedQueries(loggedInUser?.id!)
    }, [savedQueries.length == 0 || savedQueries])

    return (
        <>
            <div className='py-md-1'>
                <h1 className="my-5 text-center text-success">Query Recommendations</h1>

                <div className="container">
                    <SavedQueryAccordion savedQueries={savedQueries} queryGroupName={"Saved Queries"} isLoading={isLoading} />
                </div>
            </div>
        </>
    )
}

export default observer(QueryRecommendations)