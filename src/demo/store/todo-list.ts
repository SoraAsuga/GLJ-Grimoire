import { atom, selector } from 'recoil';
import { TodoListItem } from '../pages/todo-list/types';

export const todoListState = atom<TodoListItem[]>({
  key: 'todo-list/list',
  default: [],
});

export const unfinishedList = selector({
  key: 'todo-list/unfinishedList',
  get({ get }) {
    return get(todoListState).filter(({ isFinished }) => !isFinished);
  },
});

export const finishedList = selector({
  key: 'todo-list/finishedList',
  get({ get }) {
    return get(todoListState).filter(({ isFinished }) => isFinished);
  },
});
