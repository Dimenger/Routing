import styles from "./add.module.css";

export const AddButton = ({ onTodoAdd }) => {
  return (
    <button
      className={`${styles.addButton} ${styles.customButton}`}
      onClick={onTodoAdd}
      type="button"
    >
      ✚
    </button>
  );
};
