import QueryExecuter from '../Components/QueryExecuter';
import ResultTable from '../Components/ResultTable';

const QueryFunction = () => {
    return (
        <div className='mt-5 mb-5'>
            <QueryExecuter />
            <ResultTable />
        </div>
    )
}

export default QueryFunction