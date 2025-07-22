import { AddButton } from "./add/add";
import { SearchButton } from "./search/search";
import { SortButton } from "./sort/sort";
import styles from "./control-panel.module.css";

export const ControlPanel = ({
  onTodoAdd,
  isSortingEnabled,
  onSortingToggle,
  searchTerm,
  handleSearchChange,
}) => {
  return (
    <div className={styles.controlPanel}>
      {/* Поле поиска */}
      <SearchButton
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      {/* Кнопка сортировки */}
      <SortButton
        isSortingEnabled={isSortingEnabled}
        onSortingToggle={onSortingToggle}
      />

      {/* Кнопка добавления */}
      <AddButton onTodoAdd={onTodoAdd} />
    </div>
  );
};
