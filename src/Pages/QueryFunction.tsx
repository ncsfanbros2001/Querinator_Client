import { observer } from 'mobx-react-lite';
import QueryExecuter from '../Components/QueryExecuter';
import ResultTable from '../Components/ResultTable';
import { useStore } from '../Stores/store';

const QueryFunction = () => {
    return (
        <div className='mt-5 mb-5'>
            <QueryExecuter />
            <ResultTable />
        </div>
    )
}

export default observer(QueryFunction)