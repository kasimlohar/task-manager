// Bar to search and filter tasks
function FilterBar(props) {
  return (
    <div className="filter-bar">
      <div>
        <label>Search</label>
        <input
          value={props.search}
          onChange={function (event) {
            props.onSearchChange(event.target.value);
          }}
        />
      </div>

      <div>
        <label>Status</label>
        <select
          value={props.statusFilter}
          onChange={function (event) {
            props.onStatusChange(event.target.value);
          }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
