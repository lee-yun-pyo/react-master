import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  function onChange(event: React.FormEvent<HTMLInputElement>) {
    const {currentTarget: {value}} = event;
    setValue(value);
  }
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    // event: React.FormEvent<HTMLFormElement>: preventDefault()가 event의 함수임을 알려줌.
    event.preventDefault();
    console.log("sdf" + value);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="username" onChange={onChange} value={value} />
        <button>Click</button>
      </form>
    </div>
  );
}

export default App;
