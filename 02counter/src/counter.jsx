import { useState } from "react";

function Counter() {
    // const counter = 10;
    let [counter, setCounter] = useState(15);

    function increaseCounter() {
        counter = counter + 1;
        setCounter(counter);
    }
    return (
        <>
            <div>Counter</div>
            <div>Counter value: {counter}</div>

            <button onClick={increaseCounter}>Add</button>
            <button>Remove</button>
        </>
    )
}