const fetchServer = async (method, params = {}, data) => {
  let url = "http://localhost:3000/todos";

  if (params.id !== undefined) {
    url += `/${params.id}`;
  }

  const options = {
    method: method,
    headers: { "Content-Type": "application/json;charset=utf-8" },
  };

  if (method === "POST" || method === "PATCH") {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  return await response.json();
};

// Создание нового todo
export const createTodo = (newTodo) => {
  const todoWithDefault = {
    ...newTodo,
    completed: false,
  };
  return fetchServer("POST", {}, todoWithDefault);
};

// Получение всех todos
export const readTodo = () => fetchServer("GET");

// Обновление todo по id
export const updateTodo = (todoId, todoData) =>
  fetchServer("PATCH", { id: todoId }, todoData);

// Удаление по id
export const deleteTodo = (todoId) => fetchServer("DELETE", { id: todoId });
