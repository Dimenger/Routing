import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateTodo, deleteTodo } from "../../api/api";
import styles from "./todo-page.module.css";

export const TodoPage = ({ todos, onUpdate, setRefreshTodos }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todoItem, setTodoItem] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const todoFound = todos.find((t) => t.id === id);
    if (todoFound) {
      setTodoItem(todoFound);
      setTitle(todoFound.title);
    } else {
      navigate("/404");
    }
  }, [todos, id, navigate]);

  if (!todoItem) return null;

  const handleSave = async () => {
    try {
      await updateTodo(todoItem.id, { title });
      onUpdate();
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
    }
  };

  // Обновление статуса выполнения
  const handleToggleComplete = async () => {
    try {
      await updateTodo(todoItem.id, { completed: !todoItem.completed });
      // Обновляем локальный статус и вызываем обновление списка
      setTodoItem((prev) => ({ ...prev, completed: !prev.completed }));
      onUpdate();
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    }
  };

  // Удаление задачи
  const handleDeleteTodo = async () => {
    if (!window.confirm(`Удалить задачу "${title}"?`)) return;

    try {
      await deleteTodo(todoItem.id);
      setRefreshTodos((prev) => !prev); // Обновляем список задач в главной странице
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  return (
    <div className={styles.todoeditwindow}>
      <h2>Редактировать задачу</h2>

      {/* Статус выполнения */}
      <label>
        Выполнено:
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={todoItem.completed}
          onChange={handleToggleComplete}
        />
      </label>

      {/* Название задачи */}

      <textarea
        className={styles.textarea}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Кнопка сохранить */}
      <button className={styles.button} onClick={handleSave}>
        Сохранить
      </button>

      {/* Кнопка удаления */}
      <button
        className={styles.button}
        onClick={() => handleDeleteTodo()}
        aria-label="Удалить задачу"
      >
        Удалить задачу
      </button>

      {/* Кнопка назад */}
      <button className={styles.button} onClick={() => navigate(-1)}>
        Назад
      </button>
    </div>
  );
};
