import { useEffect, useRef, useState } from "react"
import '../Stylesheets/Update_Modal.css'
import { observer } from "mobx-react-lite"
import { useStore } from "../Stores/store"

interface Props {
    queryId: string,
    updateMode: boolean,
    setUpdateMode: any
}

const UpdateModal = ({ queryId, updateMode, setUpdateMode }: Props) => {
    const [titleUpdateValues, setTitleUpdateValues] = useState<string>('')
    const [queryUpdateValues, setQueryUpdateValues] = useState<string>('')

    const titleInput = useRef(null)
    const queryInput = useRef(null)

    const { queryStore, accountStore } = useStore();
    const { loadOneSavedQuery, singleSavedQuery, unloadSingleSavedQuery, updateSavedQuery } = queryStore;
    const { loggedInUser } = accountStore

    useEffect(() => {
        if (updateMode === true) {
            loadOneSavedQuery(queryId)
        }
        else if (updateMode === false) {
            unloadSingleSavedQuery()
        }
    }, [updateMode])

    useEffect(() => {
        setTitleUpdateValues(singleSavedQuery?.title!);
        setQueryUpdateValues(singleSavedQuery?.query!);

        (titleInput.current as any).value = singleSavedQuery?.title!;
        (queryInput.current as any).value = singleSavedQuery?.query!;

    }, [singleSavedQuery != null])

    const updateQuery = async () => {
        await updateSavedQuery(
            loggedInUser?.id!,
            {
                queryId: queryId,
                title: titleUpdateValues,
                query: queryUpdateValues
            }
        )

        setUpdateMode(false)
    }

    return (
        <>
            <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title">Update Query</h4>
                        </div>

                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <input type="text" className="form-control" placeholder="Title..." id="queryTitle"
                                        onChange={(event) => setTitleUpdateValues(event.target.value)} ref={titleInput} />
                                </div>

                                <div className="row mt-3">
                                    <input type="text" className="form-control" placeholder="Query..." id="queryInput"
                                        onChange={(event) => setQueryUpdateValues(event.target.value)} ref={queryInput} />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                onClick={() => setUpdateMode(false)}>
                                Close
                            </button>

                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => updateQuery()}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(UpdateModal)