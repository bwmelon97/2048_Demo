// 액션 타입
const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;
const REMOVE_TODO = 'todos/REMOVE_TODO' as const;

// 액션 생성 함수
const addTodo = (text: string) => ({type: ADD_TODO, payload: text})
const toggleTodo = (id: number) => ({type: TOGGLE_TODO, payload: id})
const removeTodo = (id: number) => ({type: REMOVE_TODO, payload: id})

// 액션들의 타입스크립트 타입 준비
type TodoAction = 
    ReturnType<typeof addTodo> |
    ReturnType<typeof toggleTodo> |
    ReturnType<typeof removeTodo> ;

export {}