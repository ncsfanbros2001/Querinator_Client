import { CSVLink } from 'react-csv'
import { useStore } from '../Stores/store'
import Spinner from '../Helpers/Spinner'
import { observer } from 'mobx-react-lite'
import { toast } from 'react-toastify'
import '../Stylesheets/Result_Table.css'

const ResultTable = () => {
    const { queryStore } = useStore()
    const { queryResult, isQueryLoading, columnNames, tableHidden, entireResultHidden } = queryStore

    const csvReport = {
        filename: 'Report.csv',
        data: queryResult?.result,
        header: columnNames
    }

    return (
        <div>
            {isQueryLoading === false ? (<div>
                {queryResult !== undefined && entireResultHidden === false && (
                    <div>
                        <h1 className='text-success mt-5 text-center'>RESULT</h1>
                        <div className='d-flex justify-content-center p-2'>
                            <div className='w-50 p-2' style={{
                                backgroundColor: '#F5F5F5', borderRadius: 10,
                                border: '2px solid #696969'
                            }}>
                                <h3>Query Status:
                                    <span className={queryResult?.isSuccess === true ? 'text-success' : 'text-danger'}>
                                        {queryResult?.isSuccess === true ? (' Success') : (' Failed')}
                                    </span>
                                </h3>

                                {queryResult.isSuccess === false && (
                                    <>
                                        <h3>Errors: </h3>
                                        <ul>
                                            {queryResult?.errorMessage}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {queryResult?.isSuccess === true && tableHidden === false && (
                    <div className='d-flex flex-column align-items-center'>
                        <div className='form-group d-flex justify-content-center p-3 text-center tableContainer'>
                            {queryResult?.result.length > 0 ? (
                                <table className="table table-bordered">
                                    <thead>
                                        <tr className="table-dark">
                                            {columnNames && columnNames.map((columnName: string, key: number) => {
                                                return (
                                                    <th scope="col" key={key}>{columnName}</th>
                                                )
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {queryResult?.result.map((value: any, key: number) => {
                                            return (
                                                <tr key={key}>
                                                    {columnNames && columnNames.map((columnName: string, key: number) => {
                                                        return (
                                                            <td key={key}>{value[columnName]}</td>
                                                        )
                                                    })}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <h3>This Table Is Empty</h3>
                            )}
                        </div>

                        <button className='btn btn-primary mt-3' hidden={!(queryResult?.result.length > 0)}
                            onClick={() => toast.info("Downloading...")}>
                            <CSVLink {...csvReport} style={{ color: "white", textDecoration: "none" }}>
                                <i className="bi bi-file-earmark-arrow-down"></i>  Download .csv
                            </CSVLink>
                        </button>
                    </div>
                )}
            </div>) : (
                <div className='mt-3'>
                    <Spinner />
                </div>
            )}
        </div>
    )
}

export default observer(ResultTable)