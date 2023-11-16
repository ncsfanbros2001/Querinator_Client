import { useEffect } from "react"
import SavedQueryCollapsable from "../Components/SavedQueryCollapsable"
import { useStore } from "../Stores/store"
import { observer } from "mobx-react-lite"

const QueryRecommendations = () => {

    const { queryStore } = useStore()
    const { loadAllSavedQueries, savedQueries, isLoading } = queryStore

    useEffect(() => {
        loadAllSavedQueries()
    }, [savedQueries.length == 0 || savedQueries])

    return (
        <>
            <div className='py-md-1'>
                <h1 className="my-5 text-center text-success">Query Recommendations</h1>

                <div className="container">
                    <SavedQueryCollapsable savedQueries={savedQueries} queryGroupName={"Saved Queries"} isLoading={isLoading} />
                </div>
            </div>
        </>
    )
}

export default observer(QueryRecommendations)