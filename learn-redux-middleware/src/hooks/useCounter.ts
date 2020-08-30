import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from "../modules";
import { increase, decrease } from "../modules/counter";


function useCounter() {
    const count = useSelector( (state: RootState) => state.counter.count );
    const dispatch = useDispatch();

    const onIncrease = useCallback( () => dispatch(increase()), [dispatch] );
    const onDecrease = useCallback( () => dispatch(decrease()), [dispatch] );

    return {
        count,
        onIncrease,
        onDecrease,
    }
}

export default useCounter;