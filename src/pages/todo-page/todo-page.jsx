import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { readTodo, updateTodo, deleteTodo } from "../../api/api";
import styles from "./todo-page.module.css";

export const TodoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todoItem, setTodoItem] = useState(null);
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todo = await readTodo(id);
        if (todo) {
          setTodoItem(todo);
          setTitle(todo.title);
        }
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
        navigate("/404"); // Переход на страницу 404 при ошибке
      }
    };

    fetchTodo();
  }, [id, navigate]);

  if (!todoItem) return null;

  const handleSave = async () => {
    setErrorMessage("");
    try {
      await updateTodo(todoItem.id, { title });
      alert("Задача успешно сохранена!");
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      setErrorMessage(
        "Ошибка при сохранении задачи. Пожалуйста, попробуйте еще раз."
      );
    }
  };

  // Обновление статуса выполнения
  const handleToggleComplete = async () => {
    try {
      await updateTodo(todoItem.id, { completed: !todoItem.completed });
      // Обновляем локальный статус
      setTodoItem((prev) => ({ ...prev, completed: !prev.completed }));
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
      setErrorMessage(
        "Ошибка при обновлении статуса. Пожалуйста, попробуйте еще раз."
      );
    }
  };

  // Удаление задачи
  const handleDeleteTodo = async () => {
    if (!window.confirm(`Удалить задачу "${title}"?`)) return;

    try {
      await deleteTodo(todoItem.id);
      navigate("/"); // Обновляем список задач на главной странице
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
      setErrorMessage(
        "Ошибка при удалении задачи. Пожалуйста, попробуйте еще раз."
      );
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
        onClick={handleDeleteTodo}
        aria-label="Удалить задачу"
      >
        Удалить задачу
      </button>

      {/* Кнопка назад */}
      <button className={styles.button} onClick={() => navigate(-1)}>
        Назад
      </button>

      {/* Сообщение об ошибке */}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};
