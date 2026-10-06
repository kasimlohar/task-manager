// Show list of tasks
import TaskItem from './TaskItem.jsx';

function TaskList(props) {
  const tasks = props.tasks;

  // If no tasks, show friendly text
  if (tasks.length === 0) {
    return <p>No tasks yet</p>;
  }

  return (
    <div>
      {tasks.map(function (task) {
        return (
          <TaskItem
            key={task._id}
            task={task}
            onTaskChanged={props.onTaskChanged}
            onEdit={props.onEdit}
          />
        );
      })}
    </div>
  );
}

export default TaskList;
