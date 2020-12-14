import {
  addTodo,
  deleteTodo,
  moveTodoDown,
  moveTodoUp,
  toggleDone,
  updateListName,
} from "../TodoApp.actions";

jest.mock("shortid", () => ({
  generate: () => "id_1",
}));

describe("action creators return correct actions", () => {
  test("addTodo action creator", () => {
    const todo = { date: "2020-01-01", title: "Todo 1" };
    const result = addTodo("1", todo);
    const expectedResult = {
      listId: "1",
      todo: {
        date: "2020-01-01",
        done: false,
        id: "id_1",
        title: "Todo 1",
      },
      type: "ADD_TODO",
    };
    expect(result).toEqual(expectedResult);
  });

  test("deleteTodo action creator", () => {
    const result = deleteTodo("1", "2");
    const expectedResult = {
      id: "2",
      listId: "1",
      type: "DELETE_TODO",
    };
    expect(result).toEqual(expectedResult);
  });

  test("moveTodoDown action creator", () => {
    const result = moveTodoDown("1", "2");
    const expectedResult = {
      id: "2",
      listId: "1",
      type: "MOVE_TODO_DOWN",
    };
    expect(result).toEqual(expectedResult);
  });

  test("moveTodoUp action creator", () => {
    const result = moveTodoUp("1", "2");
    const expectedResult = {
      id: "2",
      listId: "1",
      type: "MOVE_TODO_UP",
    };
    expect(result).toEqual(expectedResult);
  });

  test("toggleDone action creator", () => {
    const result = toggleDone("1", "2");
    const expectedResult = {
      id: "2",
      listId: "1",
      type: "TOGGLE_DONE",
    };
    expect(result).toEqual(expectedResult);
  });

  test("updateListName action creator", () => {
    const result = updateListName("1", "List 1");
    const expectedResult = {
      listId: "1",
      name: "List 1",
      type: "UPDATE_LIST_NAME",
    };
    expect(result).toEqual(expectedResult);
  });
});
