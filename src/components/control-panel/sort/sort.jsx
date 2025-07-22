import styles from "./sort.module.css";

export const SortButton = ({ isSortingEnabled, onSortingToggle }) => {
  const onChange = ({ target }) => {
    // Вызовем функцию toggle для изменения состояния сортировки
    onSortingToggle(target.checked);
  };

  return (
    <label className={styles.checkboxLabel}>
      <input
        className={styles.sortingButton}
        type="checkbox"
        checked={isSortingEnabled}
        onChange={onChange}
      />
      <span className={styles.labelContent}>A▼</span>
    </label>
  );
};
