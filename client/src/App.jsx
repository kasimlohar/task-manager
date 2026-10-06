// Bring in tools
import { useState, useEffect } from 'react';
import './App.css';
import { getTasks } from './api.js';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import FilterBar from './components/FilterBar.jsx';

// Simple main page
function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Get tasks from backend
  async function loadTasks() {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
      setError('');
    } catch (err) {
      // Show friendly message from backend
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Could not load tasks');
      }
    } finally {
      setLoading(false);
    }
  }

  // Load tasks one time when page opens
  useEffect(function () {
    loadTasks();
  }, []);

  // Clear edit and reload after form is done
  async function handleFormDone() {
    setTaskToEdit(null);
    await loadTasks();
  }

  // Stop editing
  function handleCancelEdit() {
    setTaskToEdit(null);
  }

  // Start editing one task
  function handleEdit(task) {
    setTaskToEdit(task);
  }

  // Keep only tasks that match search and status
  function getFilteredTasks() {
    const result = [];
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const titleLow = task.title.toLowerCase();
      const searchLow = search.toLowerCase();
      const matchSearch = titleLow.includes(searchLow);

      let matchStatus = true;
      if (statusFilter !== 'All') {
        matchStatus = task.status === statusFilter;
      }

      if (matchSearch && matchStatus) {
        result.push(task);
      }
    }
    return result;
  }

  const filteredTasks = getFilteredTasks();

  // Show loading text while waiting
  if (loading) {
    return (
      <div className="container">
        <h1>Task Manager</h1>
        <p>Loading...</p>
      </div>
    );
  }

  // Show error text if load failed
  if (error !== '') {
    return (
      <div className="container">
        <h1>Task Manager</h1>
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm
        taskToEdit={taskToEdit}
        onTaskAdded={handleFormDone}
        onCancelEdit={handleCancelEdit}
      />
      <FilterBar
        search={search}
        statusFilter={statusFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
      />
      {filteredTasks.length === 0 && tasks.length > 0 ? (
        <p>No matching tasks</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onTaskChanged={loadTasks}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default App;
