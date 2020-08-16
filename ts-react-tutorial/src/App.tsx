import React from 'react';
import { TodoForm, TodoList } from "./Study/Todos";
import { TodosContextProvider } from "./Study/contexts/TodoContext";

function App() {

    return (
        <div>
            <TodosContextProvider>
                <TodoForm />
                <TodoList />
            </TodosContextProvider>
        </div>
    );
}

export default App;
