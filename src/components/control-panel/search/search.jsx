export const SearchButton = ({ searchTerm, handleSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Поиск..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};
