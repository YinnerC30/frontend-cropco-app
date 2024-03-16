// import type { RootState } from '../../app/store';
// import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counterSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export function Counter() {
  // const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch();

  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
