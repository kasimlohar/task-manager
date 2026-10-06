// Bring in tools
import { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api.js';

// Form to make or change a task
function TaskForm(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Pending');
  const [titleError, setTitleError] = useState('');
  const [serverError, setServerError] = useState('');

  // Fill form when edit task changes
  useEffect(function () {
    if (props.taskToEdit) {
      setTitle(props.taskToEdit.title || '');
      setDescription(props.taskToEdit.description || '');
      setPriority(props.taskToEdit.priority || 'Medium');
      setStatus(props.taskToEdit.status || 'Pending');
    } else {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setStatus('Pending');
    }
    setTitleError('');
    setServerError('');
  }, [props.taskToEdit]);

  // Run when form is sent
  async function handleSubmit(event) {
    event.preventDefault();

    // Check title is long enough
    if (title.trim().length < 3) {
      setTitleError('Title must be at least 3 characters');
      return;
    }
    setTitleError('');
    setServerError('');

    try {
      const data = {
        title: title,
        description: description,
        priority: priority,
        status: status
      };

      // If editing, update old task, else make new one
      if (props.taskToEdit) {
        await updateTask(props.taskToEdit._id, data);
      } else {
        await createTask(data);
      }

      // Clear the form
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setStatus('Pending');

      // Ask parent to load list again
      props.onTaskAdded();
    } catch (err) {
      // Show friendly message from backend
      if (err.response && err.response.data && err.response.data.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError('Could not save task');
      }
    }
  }

  // Clear edit mode
  function handleCancel() {
    props.onCancelEdit();
  }

  // Pick button text
  let buttonText = 'Add Task';
  if (props.taskToEdit) {
    buttonText = 'Update Task';
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          value={title}
          onChange={function (event) {
            setTitle(event.target.value);
          }}
        />
        {titleError !== '' && <p className="error-text">{titleError}</p>}
      </div>

      <div>
        <label>Description</label>
        <input
          value={description}
          onChange={function (event) {
            setDescription(event.target.value);
          }}
        />
      </div>

      <div>
        <label>Priority</label>
        <select
          value={priority}
          onChange={function (event) {
            setPriority(event.target.value);
          }}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <label>Status</label>
        <select
          value={status}
          onChange={function (event) {
            setStatus(event.target.value);
          }}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {serverError !== '' && <p className="error-text">{serverError}</p>}

      <button type="submit">{buttonText}</button>
      {props.taskToEdit && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;
