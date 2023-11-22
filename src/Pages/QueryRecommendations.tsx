import { useEffect } from "react"
import SavedQueryAccordion from "../Components/SavedQueryAccordion"
import { useStore } from "../Stores/store"
import { observer } from "mobx-react-lite"
import SelectAllAccordion from "../Components/SelectAllAccordion"

const QueryRecommendations = () => {

    const { queryStore, accountStore } = useStore()
    const { loadSavedQueries, savedQueries, isLoading, loadAllTableName, tableNames } = queryStore
    const { loggedInUser } = accountStore

    useEffect(() => {
        loadSavedQueries(loggedInUser?.id!)
    }, [savedQueries.length === 0 || savedQueries])

    useEffect(() => {
        loadAllTableName()
    }, [tableNames])

    return (
        <>
            <div className='py-md-1'>
                <h1 className="my-5 text-center text-success">Query Recommendations</h1>

                <div className="container">
                    <SavedQueryAccordion savedQueries={savedQueries} queryGroupName={"Saved Queries"} isLoading={isLoading} />
                </div>

                <div className="container">
                    <SelectAllAccordion tableNames={tableNames} queryGroupName={"Select All Queries"} isLoading={isLoading} />
                </div>
            </div>
        </>
    )
}

export default observer(QueryRecommendations)