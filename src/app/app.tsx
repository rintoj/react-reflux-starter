import '../store'
import './app.css'

import * as React from 'react'

import { TodoFooter, TodoHeader, TodoList } from './todo'

export class App extends React.Component<{}, {}> {

  render() {
    return <div id='todo-app'>
      <TodoHeader />
      <TodoList />
      <TodoFooter />
    </div>
  }
}
