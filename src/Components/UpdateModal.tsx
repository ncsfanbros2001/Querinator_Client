import { useEffect, useState } from "react"
import '../Stylesheets/Update_Modal.css'

interface Props {
    queryId: string
}

const UpdateModal = ({ queryId }: Props) => {
    const [titleUpdateValues, setTitleUpdateValues] = useState<string>('')
    const [titleQueryUpdateValues, setQueryUpdateValues] = useState<string>('')

    useEffect(() => {
        if (queryId != '') {
            console.log(queryId)
        }
    }, [queryId])

    return (
        <>
            <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title text-center">Update Query</h4>
                        </div>

                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <input type="text" className="form-control" placeholder="Title..." id="queryTitle"
                                        onChange={(event) => setTitleUpdateValues(event.target.value)} />
                                </div>

                                <div className="row mt-3">
                                    <input type="text" className="form-control" placeholder="Query..." id="queryInput"
                                        onChange={(event) => setQueryUpdateValues(event.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateModal