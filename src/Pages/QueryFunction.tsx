import { useEffect } from 'react';
import QueryExecuter from '../Components/QueryExecuter';
import ResultTable from '../Components/ResultTable';
import { useStore } from '../Stores/store';

const QueryFunction = () => {
    const { accountStore } = useStore();
    const { triggerUnauthorized, userToken } = accountStore

    useEffect(() => {
        if (!userToken) {
            triggerUnauthorized()
        }
    }, [])

    return (
        <div className='mt-5 mb-5'>
            <QueryExecuter />
            <ResultTable />
        </div>
    )
}

export default QueryFunction