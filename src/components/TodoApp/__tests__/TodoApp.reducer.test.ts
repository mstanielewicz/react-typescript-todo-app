import {
  addTodo,
  deleteTodo,
  moveTodoDown,
  moveTodoUp,
  toggleDone,
  updateListName,
} from "../TodoApp.actions";
import reducer from "../TodoApp.reducer";

jest.mock("shortid", () => ({
  generate: () => "id_1",
}));

describe("reducer works as expected", () => {
  test("initial state", () => {
    const result = reducer(undefined, { type: "" } as any);
    expect(result).toEqual({
      todoLists: [
        {
          id: "id_1",
          name: "",
          todos: [],
        },
      ],
    });
  });

  test("updateListName", () => {
    const result = reducer(undefined, updateListName("id_1", "List 1"));
    expect(result).toEqual({
      todoLists: [
        {
          id: "id_1",
          name: "List 1",
          todos: [],
        },
      ],
    });
  });

  test("addTodo", () => {
    const result1 = reducer(
      undefined,
      addTodo("id_1", { date: "2020-01-01", title: "Todo 1" })
    );
    expect(result1).toEqual({
      todoLists: [
        {
          id: "id_1",
          name: "",
          todos: [
            { date: "2020-01-01", done: false, id: "id_1", title: "Todo 1" },
          ],
        },
      ],
    });
    const result2 = reducer(
      result1,
      addTodo("id_1", { date: "2021-01-01", title: "Todo 2" })
    );
    expect(result2).toEqual({
      todoLists: [
        {
          id: "id_1",
          name: "",
          todos: [
            { date: "2020-01-01", done: false, id: "id_1", title: "Todo 1" },
            { date: "2021-01-01", done: false, id: "id_1", title: "Todo 2" },
          ],
        },
      ],
    });
  });

  test("toggleDone", () => {
    const initialState = {
      todoLists: [
        {
          id: "id_1",
          name: "List 1",
          todos: [
            { date: "2020-01-01", done: false, id: "id_1", title: "Todo 1" },
            { date: "2021-01-01", done: false, id: "id_2", title: "Todo 2" },
            { date: "2022-01-01", done: false, id: "id_3", title: "Todo 3" },
          ],
        },
      ],
    };
    const result2 = reducer(initialState, toggleDone("id_1", "id_2"));
    expect(result2).toEqual({
      todoLists: [
        {
          id: "id_1",
          name: "List 1",
          todos: [
            { date: "2020-01-01", done: false, id: "id_1", title: "Todo 1" },
            { date: "2021-01-01", done: true, id: "id_2", title: "Todo 2" },
            { date: "2022-01-01", done: false, id: "id_3", title: "Todo 3" },
          ],
        },
      ],
    });
  });

  test("deleteTodo", () => {
    const initialState = {
      todoLists: [
        {
          id: "id_1",
          name: "List 1",
          todos: [
            { date: "2020-01-01", done: false, id: "id_1", title: "Todo 1" },
            { date: "2021-01-01", done: false, id: "id_2", title: "Todo 2" },
            { date: "2022-01-01", done: false, id: "id_3", title: "Todo 3" },
          ],
        },
      ],
    };
    const result2 = reducer(initialState, deleteTodo("id_1", "id_2"));
    expect(result2).toEqual({
      todoLists: [
        {
          id: "id_1",
          name: "List 1",
          todos: [
            { date: "2020-01-01", done: false, id: "id_1", title: "Todo 1" },
            { date: "2022-01-01", done: false, id: "id_3", title: "Todo 3" },
          ],
        },
      ],
    });
  });

  test("moveTodoDown", () => {
    const initialState = {
      todoLists: [
        {
          id: "id_1",
          name: "List 1",
          todos: [
            { date: "2020-01-01", done: false, id: "id_1", title: "Todo 1" },
            { date: "2021-01-01", done: false, id: "id_2", title: "Todo 2" },
            { date: "2022-01-01", done: false, id: "id_3", title: "Todo 3" },
          ],
        },
      ],
    };
    const result2 = reducer(initialState, moveTodoDown("id_1", "id_2"));
    expect(result2).toEqual({
      todoLists: [
        {
          id: "id_1",
          name: "List 1",
          todos: [
            { date: "2020-01-01", done: false, id: "id_1", title: "Todo 1" },
            { date: "2022-01-01", done: false, id: "id_3", title: "Todo 3" },
            { date: "2021-01-01", done: false, id: "id_2", title: "Todo 2" },
          ],
        },
      ],
    });
  });

  test("moveTodoUp", () => {
    const initialState = {
      todoLists: [
        {
          id: "id_1",
          name: "List 1",
          todos: [
            { date: "2020-01-01", done: false, id: "id_1", title: "Todo 1" },
            { date: "2021-01-01", done: false, id: "id_2", title: "Todo 2" },
            { date: "2022-01-01", done: false, id: "id_3", title: "Todo 3" },
          ],
        },
      ],
    };
    const result2 = reducer(initialState, moveTodoUp("id_1", "id_2"));
    expect(result2).toEqual({
      todoLists: [
        {
          id: "id_1",
          name: "List 1",
          todos: [
            { date: "2021-01-01", done: false, id: "id_2", title: "Todo 2" },
            { date: "2020-01-01", done: false, id: "id_1", title: "Todo 1" },
            { date: "2022-01-01", done: false, id: "id_3", title: "Todo 3" },
          ],
        },
      ],
    });
  });
});
