import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  /*
    useState() hook: This is a built-in function that allows functional components to have state. It helps store and update values in a component.
    - It makes state management easy in functional components.
    - When state updates react re-render the component.
    - It can holds any datatype.
  */
  const [length, setLength] = useState(8); // Default password length is 8
  const [isNumber, setNumber] = useState(false); // Include numbers?
  const [isCharacter, setCharacter] = useState(false); // Include special characters?
  const [password, setPassword] = useState(""); // Stores the generated password

  /*
    useCallback(): This hook is used to optimize performance by memoizing (saving) a function so that it doesn’t get re-created on every render.
    - This hooks always takes one function & dependencies as parameter.
    - Syntax: useCallback(fn, [dependecies])
    - This returns the same function reference unless dependencies changes.
    - It is useful for passing functions to child components to prevent unnecessary re-renders.
    - Works well with React.memo for optimizing functional components.
  */
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // base character set

    if (isNumber) str += "0123456789"; // append numbers if selected
    if (isCharacter) str += "!@#$%^&*-_+=[]{}~`"; // append special characters if selected

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); // randomly pick index
      pass += str.charAt(char); // append character to password
    }

    setPassword(pass); // update password state
  }, [length, isNumber, isCharacter, setPassword]);

  /*
    useEffect(): This hook is used to perform side effects in functional components. Side effects includes:
    Fetching data from API, Updating DOM, Setting up subscriptions or timer.
    - This hook runs after page rendering.
    - It helps in fetching data, event listeners and subscriptions.
    - It clean up function prevents memory leak.
    - It only runs when specified dependencies change.
  */
  useEffect(() => {
    passwordGenerator(); // auto-generate password whenever options change
  }, [length, isNumber, isCharacter, passwordGenerator]);

  /* 
    useRef(): This hook is used to access & modify DOM element directly. It store values without causing re-rending.
    - It can store values between renders like a class instance variable. 
  */
  const passwordRef = useRef(null); // used to reference password input box

  const copyPWToClipboard = useCallback(() => {
    passwordRef.current?.select(); // select effect came
    passwordRef.current?.setSelectionRange(0, 3); // select range based on range value.
    window.navigator.clipboard.writeText(password); // copy to clipboard using browser API
  }, [password]);

  // HTML value renders
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 bg-gray-700">
        <h1 className="text-4xl text-center text-white mb-4">Password Generator</h1>

        {/* Password display with copy functionality */}
        <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            className="outline-none w-full py-2 px-3 bg-white text-orange-600"
            placeholder="Password"
            readOnly
          />

          <button
            className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0"
            onClick={copyPWToClipboard}
          >
            Copy
          </button>
        </div>

        {/* Controls for password options */}
        <div className="flex justify-between text-sm gap-x-2">

          {/* Slider for length */}
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="">Length : {length}</label>
          </div>

          {/* Toggle numbers */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isNumber}
              id="numberInput"
              onChange={() => setNumber((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          {/* Toggle special characters */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isCharacter}
              id="characterInput"
              onChange={() => setCharacter((prev) => !prev)}
            />
            <label htmlFor="characterInput">Character</label>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
