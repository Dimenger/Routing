// components/todo/todo-list-page.jsx
import { useState, useEffect } from "react";
import { readTodos, createTodo, updateTodo } from "../../api/api";
import { ControlPanel } from "../../components/control-panel/control-panel";
import { Todo } from "../../components/todo/todo";

export const TodoListPage = () => {
  const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userTodos, setUserTodos] = useState([]);
  const [refreshTodos, setRefreshTodos] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await readTodos();
        setUserTodos(todos);
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
      }
    };
    fetchTodos();
  }, [refreshTodos, setUserTodos]);

  const handleUpdateTodos = () => {
    setRefreshTodos((prev) => !prev);
  };

  // Добавление задачи
  const handleAddTodo = async () => {
    const title = prompt("Введите название задачи");
    if (!title) return;
    try {
      await createTodo({ title });
      handleUpdateTodos(); // Обновляем список задач
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  };

  // Создаем отсортированный список задач
  const sortedTodos = isAlphabetSorting
    ? [...userTodos].sort((a, b) => a.title.localeCompare(b.title))
    : userTodos;

  // Фильтрация по поисковому запросу
  const filteredTodos = sortedTodos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Обработчик поиска
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Обработчик изменения статуса выполнения задачи
  const handleToggleComplete = async (id, currentCompleted) => {
    try {
      await updateTodo(id, { completed: !currentCompleted });
      // Обновляем локальный список задач
      setUserTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !currentCompleted } : todo
        )
      );
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    }
  };

  return (
    <>
      <h2>Задания</h2>
      <ControlPanel
        onTodoAdd={handleAddTodo}
        isSortingEnabled={isAlphabetSorting}
        onSortingToggle={(checked) => setIsAlphabetSorting(checked)}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <div>
        {filteredTodos.map(({ id, title, completed }) => (
          <Todo
            key={id}
            title={title}
            completed={completed}
            id={id}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </div>
    </>
  );
};
