// Bring in axios tool
import axios from 'axios';

// Pick base address from .env file or use local
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get all tasks
export function getTasks() {
  return axios.get(baseURL + '/tasks');
}

// Make a new task
export function createTask(data) {
  return axios.post(baseURL + '/tasks', data);
}

// Change a task
export function updateTask(id, data) {
  return axios.put(baseURL + '/tasks/' + id, data);
}

// Remove a task
export function deleteTask(id) {
  return axios.delete(baseURL + '/tasks/' + id);
}
