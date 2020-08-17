import { ActionType } from 'typesafe-actions';
import * as actions from './actions';


/* 액션들의 타입스크립트 타입 준비 */
export type TodosAction = ActionType<typeof actions>;

/* state를 위한 타입 설정 */
export type Todo = {
    id: number;
    text: string;
    done: boolean;
}  

export type TodosState = { todoList: Todo[]};

/* 초기 state 설정 */
export const initialState: TodosState = {
    todoList: [
        { id: 1, text: '타입스크립트 배우기', done: true },
        { id: 2, text: '타입스크립트와 리덕스 함께 사용해보기', done: true },
        { id: 3, text: '투두리스트 만들기', done: false }
    ]
};