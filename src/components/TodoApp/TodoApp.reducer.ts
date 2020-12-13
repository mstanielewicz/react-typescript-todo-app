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

    case "DELETE_TODO":
      return {
        todoLists: state.todoLists.map((list) =>
          list.id === action.listId
            ? {
                ...list,
                todos: list.todos.filter((todo) => todo.id !== action.id),
              }
            : list
        ),
      };

    case "MOVE_TODO_UP":
      return {
        todoLists: state.todoLists.map((list) => {
          if (
            list.id !== action.listId ||
            list.todos.length === 0 ||
            list.todos.length === 1
          )
            return list;

          const index = list.todos.findIndex((todo) => todo.id === action.id);

          if (index === -1 || !index) return list;

          const todos = [...list.todos];

          [todos[index - 1], todos[index]] = [todos[index], todos[index - 1]];

          return {
            ...list,
            todos,
          };
        }),
      };

    case "MOVE_TODO_DOWN":
      return {
        todoLists: state.todoLists.map((list) => {
          if (
            list.id !== action.listId ||
            list.todos.length === 0 ||
            list.todos.length === 1
          )
            return list;

          const index = list.todos.findIndex((todo) => todo.id === action.id);

          if (index === -1 || index === list.todos.length - 1) return list;

          const todos = [...list.todos];

          [todos[index + 1], todos[index]] = [todos[index], todos[index + 1]];

          return {
            ...list,
            todos,
          };
        }),
      };

    default:
      return state;
  }
};

export default reducer;
