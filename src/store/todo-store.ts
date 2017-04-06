import { AddTodoAction, RemoveCompletedTodosAction, RemoveTodoAction, SetFilterAction, ToggleAllTodosAction, ToggleTodoAction } from '../action'
import { ReplaceableState, action, store } from 'react-reflux'

import { AppState } from '../state'
import { Observable } from 'rxjs/Rx'
import { Observer } from 'rxjs/Rx'

@store
export class TodoStore {

  @action
  add(state: AppState, action: AddTodoAction): AppState {
    return new ReplaceableState({
      todos: (state.todos || []).concat(
        Object.assign({ id: this.generateId() }, action.todo)
      )
    })
  }

  @action
  toggleTodo(state: AppState, action: ToggleTodoAction): AppState {
    return {
      todos: (state.todos || []).map(todo =>
        (todo.id === action.id) ? Object.assign({}, todo, {
          completed: action.completed
        }) : todo
      )
    }
  }

  @action
  remove(state: AppState, action: RemoveTodoAction): AppState {
    return {
      todos: (state.todos || []).filter(todo => todo.id !== action.id)
    }
  }

  @action
  removeCompleted(state: AppState, action: RemoveCompletedTodosAction): AppState {
    return {
      todos: (state.todos || []).filter(todo => !todo.completed)
    }
  }

  @action
  toggleAll(state: AppState, action: ToggleAllTodosAction): Promise<AppState> {
    return new Promise((resolve, reject) => {
      resolve({
        todos: (state.todos || []).map(todo => Object.assign({}, todo, {
          completed: action.completed
        }))
      })
    })
  }

  @action
  setFilter(state: AppState, action: SetFilterAction): Observable<AppState> {
    return Observable.create((observer: Observer<AppState>) => {
      observer.next({ filter: action.filter })
      observer.complete()
    }).share()
  }

  private generateId(): AppState {
    return btoa(Math.random() + '').toLowerCase().substr(6, 6)
  }

}