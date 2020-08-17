// 액션 타입
const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;
const REMOVE_TODO = 'todos/REMOVE_TODO' as const;

// 액션 생성 함수
const addTodo = (text: string) => ({type: ADD_TODO, payload: text})
const toggleTodo = (id: number) => ({type: TOGGLE_TODO, payload: id})
const removeTodo = (id: number) => ({type: REMOVE_TODO, payload: id})

// 액션들의 타입스크립트 타입 준비
type TodosAction = 
    ReturnType<typeof addTodo> |
    ReturnType<typeof toggleTodo> |
    ReturnType<typeof removeTodo> ;


// state를 위한 타입 설정
export type Todo = {
    id: number;
    text: string;
    done: boolean;
}  

type TodosState = { todoList: Todo[]};

// 초기 state 설정
const initialState: TodosState = {
    todoList: [
        { id: 1, text: '타입스크립트 배우기', done: true },
        { id: 2, text: '타입스크립트와 리덕스 함께 사용해보기', done: true },
        { id: 3, text: '투두리스트 만들기', done: false }
    ]
};


/* Reducer */
export default function todos ( state: TodosState = initialState, action: TodosAction ): TodosState {
    switch (action.type) {
        case ADD_TODO: {
            const nextId: number = Math.max(0, ...state.todoList.map(todo => todo.id) ) + 1;
            return {
                ...state,
                todoList: state.todoList.concat({
                    id: nextId,
                    text: action.payload,
                    done: false
                })
            }
        }

        case TOGGLE_TODO: {
            return {
                ...state,
                todoList: state.todoList.map( todo => {
                    return todo.id !== action.payload ? 
                    {...todo, done: !todo.done} : todo;
                })
            }
        }

        case REMOVE_TODO: {
            return {
                ...state,
                todoList: state.todoList.filter( todo => {
                    return todo.id !== action.payload
                })
            }
        }

        default:
            return state;
    }
}

