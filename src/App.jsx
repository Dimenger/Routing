import { Routes, Route } from "react-router-dom";
import { TodoListPage } from "./pages/todo-list-page/todo-list-page"; // страница со списком задач
import { TodoPage } from "./pages/todo-page/todo-page"; // страница редактирования задачи
import { NotFoundPage } from "./pages/not-found-page/not-found-page";

export const App = () => {
  return (
    <Routes>
      {/* Главная страница со списком */}
      <Route path="/" element={<TodoListPage />} />

      {/* Страница отдельной задачи */}
      <Route path="/todo/:id" element={<TodoPage />} />

      {/* Страница 404 */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
