import React from 'react';
// import { CounterContainer } from "./containers";
// import { CounterWithHooks } from "./components";
import { TodoInsert, TodoList } from "./components";

function App() {
  return (
    // <CounterContainer />
    // <CounterWithHooks />
    <>
        <TodoInsert />
        <TodoList />
    </>
  );
}

export default App;
