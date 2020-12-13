import shortid from "shortid";
import { ITodoAppState, TodoAppActionType } from "./TodoApp";

export const initialState: ITodoAppState = {
  todoLists: [
    {
      id: shortid.generate(),
      name: "",
      todos: [],
    },
  ],
};

const reducer = (
  state: ITodoAppState = initialState,
  action: TodoAppActionType
): ITodoAppState => {
  switch (action.type) {
    case "UPDATE_LIST_NAME":
      return {
        todoLists: state.todoLists.map((list) =>
          list.id === action.listId
            ? {
                ...list,
                name: action.name,
              }
            : list
        ),
      };

    case "ADD_TODO":
      return {
        todoLists: state.todoLists.map((list) =>
          list.id === action.listId
            ? {
                ...list,
                todos: [...list.todos, action.todo],
              }
            : list
        ),
      };

    case "TOGGLE_DONE":
      return {
        todoLists: state.todoLists.map((list) =>
          list.id === action.listId
            ? {
                ...list,
                todos: list.todos.map((todo) =>
                  todo.id === action.id ? { ...todo, done: !todo.done } : todo
                ),
              }
            : list
        ),
      };

    case "UPDATE_TODO":
      return {
        todoLists: state.todoLists.map((list) =>
          list.id === action.listId
            ? {
                ...list,
                todos: list.todos.map((todo) =>
                  todo.id === action.todo.id ? action.todo : todo
                ),
              }
            : list
        ),
      };
    default:
      return state;
  }
};

export default reducer;
