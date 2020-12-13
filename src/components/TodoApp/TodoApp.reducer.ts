import { ITodoAppState, TodoAppActionType } from "./TodoApp";

export const initialState: ITodoAppState = {
  todos: [],
};

const reducer = (
  state: ITodoAppState = initialState,
  action: TodoAppActionType
): ITodoAppState => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        todos: [...state.todos, action.todo],
      };
    case "TOGGLE_DONE":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        ),
      };
    case "UPDATE_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.todo.id ? action.todo : todo
        ),
      };
    default:
      return state;
  }
};

export default reducer;
