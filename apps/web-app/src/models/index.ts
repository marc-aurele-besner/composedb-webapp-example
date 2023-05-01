export type Todo = {
  node: {
    id: string
    title: string
    description: string
    status: string
    tags: string
  }
}

export type Todos = {
  viewer: {
    id: string
    profile: {
      displayName: string
    }
    todoList: {
      edges: Todo[]
    }
  }
}
