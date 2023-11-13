import { useEffect } from "react"
import Collapsable from "../Components/Collapsable"
import { useStore } from "../Stores/store"
import { observer } from "mobx-react-lite"

const QueryRecommendations = () => {

    const { queryStore } = useStore()
    const { loadSavedQuery, savedQueries, isLoading } = queryStore

    useEffect(() => {
        loadSavedQuery()
    }, [savedQueries || savedQueries == undefined])

    return (
        <>
            <div className='py-md-1'>
                <h1 className="my-5 text-center text-success">Query Recommendations</h1>

                <div className="container">
                    <Collapsable savedQueries={savedQueries} queryGroupName={"Saved Queries"} isLoading={isLoading} />
                </div>
            </div>
        </>
    )
}

export default observer(QueryRecommendations)