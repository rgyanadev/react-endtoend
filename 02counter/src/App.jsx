import './App.css'
import { useState } from 'react';

function App() {
  let [counter, setCounter] = useState(15);

  function increaseCounter() {
    if (counter === 20) {
      console.log('Cannot go more than 20')
      return;
    } else {
      counter = counter + 1;
      setCounter(counter);
    }
  }

  function decreaseCounter() {
    if (counter === 0) {
      console.log('Cannot be less than 0')
      return;
    } else {
      counter = counter - 1;
      setCounter(counter);
    }
  }

  return (
    <>
      <div>Counter</div>
      <div>Counter value: {counter}</div>

      <button onClick={increaseCounter}>Add</button>
      <button onClick={decreaseCounter}>Remove</button>
    </>
  )
}

export default App;
