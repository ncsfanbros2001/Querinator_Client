import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

interface Props {
    tableNames: string[]
    queryGroupName: string
    isLoading: boolean
}

const SelectAllAccordion = ({ tableNames, queryGroupName, isLoading }: Props) => {
    const navigate = useNavigate();

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
                        {tableNames.length > 0 ? tableNames.map((item: string, key: number) => (
                            <div className="accordion-body d-flex flex-row justify-content-between" key={key}>
                                <div style={{ width: '80%' }} className="p-1">
                                    <h5 className="queryTitle">Select All {item}</h5>
                                </div>

                                <div className="d-flex justify-content-end" style={{ width: '35%' }}>
                                    <button className='btn btn-success function-button' disabled={isLoading}
                                        onClick={() => execute("SELECT * FROM " + item)}>
                                        <i className="bi bi-lightning"></i>
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center p-2">
                                <h3>Unable to load Select All queries</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(SelectAllAccordion)