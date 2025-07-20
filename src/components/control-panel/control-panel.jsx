import styles from "./control-panel.module.css";

export const ControlPanel = ({
  onTodoAdd,
  isSortingEnabled,
  onSortingToggle,
  searchTerm,
  handleSearchChange,
}) => {
  const onChange = ({ target }) => {
    // Вызовем функцию toggle для изменения состояния сортировки
    onSortingToggle(target.checked);
  };

  return (
    <div className={styles.controlPanel}>
      {/* Поле поиска */}
      <input
        className={styles.search}
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Кнопка сортировки */}
      <label className={styles.checkboxLabel}>
        <input
          className={styles.sortingButton}
          type="checkbox"
          checked={isSortingEnabled}
          onChange={onChange}
        />
        <span className={styles.labelContent}>A▼</span>
      </label>

      {/* Кнопка добавления */}
      <button
        className={`${styles.addButton} ${styles.customButton}`}
        onClick={onTodoAdd}
        type="button"
      >
        ✚
      </button>
    </div>
  );
};
