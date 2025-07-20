// components/todo/todo.jsx
import styles from "./todo.module.css";
import { Link } from "react-router-dom";

export const Todo = ({ title, completed, id, onToggleComplete }) => {
  const handleChange = () => {
    onToggleComplete(id, completed);
  };

  // Передача обрезанного текста
  const truncate = (str, maxLength = 20) => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + "...";
  };

  return (
    <div className={styles.todo}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={completed}
        onChange={handleChange}
      />

      <div className={styles.taskContent}>
        <Link to={`/todo/${id}`} className={styles.taskLink}>
          <span className={styles.title}>{truncate(title)}</span>
        </Link>
      </div>
    </div>
  );
};
