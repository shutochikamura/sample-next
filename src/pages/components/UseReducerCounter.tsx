import { useReducer } from "react";

// reducerが受け取るactionの型を定義します
type Action = 'DECREMENT' | 'INCREMENT' | 'DOUBLE' | 'RESET'

// 現在の状態とactionに基づいて次の状態を返します
const reducer = (currentCount: number, action: Action) => {
    switch (action) {
        case 'DECREMENT':
            return currentCount - 1
        case 'INCREMENT':
            return currentCount + 1
        case 'DOUBLE':
            return currentCount * 2
        case 'RESET':
            return 0
        default:
            return currentCount
    }
}

type CounterProps = {
    initialValue: number
}

const UseReducerCounter = (props: CounterProps) => {
    const {initialValue} = props
    const [count, dispatch] = useReducer(reducer, initialValue)

    return (
        <div>
            <p>Count: {count}</p>
            {/* dispatch関数にactionを渡して、状態を更新します */}
            <button onClick={() => dispatch('DECREMENT')}>-</button>
            <button onClick={() => dispatch('INCREMENT')}>+</button>
            <button onClick={() => dispatch('DOUBLE')}>✖️2</button>
            <button onClick={() => dispatch('RESET')}>Reset</button>
        </div>
    )
}

export default UseReducerCounter