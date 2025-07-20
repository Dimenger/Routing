import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { TodoListPage } from "./components/todo-list-page/todo-list-page"; // страница со списком задач
import { TodoPage } from "./components/todo-page/todo-page"; // страница редактирования задачи
import { NotFoundPage } from "./components/not-found-page/not-found-page";

export const App = () => {
  const [userTodos, setUserTodos] = useState([]);
  const [refreshTodos, setRefreshTodos] = useState(false);

  const handleUpdateTodos = () => {
    setRefreshTodos((prev) => !prev);
  };

  return (
    <Routes>
      {/* Главная страница со списком */}
      <Route
        path="/"
        element={
          <TodoListPage
            userTodos={userTodos}
            setUserTodos={setUserTodos}
            refreshTodos={refreshTodos}
            onUpdate={handleUpdateTodos}
          />
        }
      />

      {/* Страница отдельной задачи */}
      <Route
        path="/todo/:id"
        element={
          <TodoPage
            todos={userTodos}
            setUserTodos={setUserTodos}
            onUpdate={handleUpdateTodos}
            setRefreshTodos={setRefreshTodos}
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
