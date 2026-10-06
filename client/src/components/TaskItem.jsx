// Bring in tools
import { updateTask, deleteTask } from '../api.js';

// Show one task
function TaskItem(props) {
  const task = props.task;

  // Remove this task
  async function handleDelete() {
    const ok = window.confirm('Delete this task?');
    if (!ok) {
      return;
    }
    try {
      await deleteTask(task._id);
      props.onTaskChanged();
    } catch (err) {
      alert('Could not delete task');
    }
  }

  // Change status
  async function handleStatusChange(event) {
    const newStatus = event.target.value;
    try {
      await updateTask(task._id, { status: newStatus });
      props.onTaskChanged();
    } catch (err) {
      alert('Could not update status');
    }
  }

  // Start editing this task
  function handleEdit() {
    props.onEdit(task);
  }

  // Pick color for status
  let statusClass = 'badge badge-pending';
  if (task.status === 'In Progress') {
    statusClass = 'badge badge-progress';
  }
  if (task.status === 'Completed') {
    statusClass = 'badge badge-done';
  }

  // Pick color for priority
  let priorityClass = 'badge badge-low';
  if (task.priority === 'Medium') {
    priorityClass = 'badge badge-medium';
  }
  if (task.priority === 'High') {
    priorityClass = 'badge badge-high';
  }

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>
        <span className={statusClass}>{task.status}</span>
        <span className={priorityClass}>{task.priority}</span>
      </p>
      <p>Created: {new Date(task.createdAt).toLocaleString()}</p>

      <div>
        <label>Status</label>
        <select value={task.status} onChange={handleStatusChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

export default TaskItem;
