const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Customer Name" },
    "task-2": { id: "task-2", content: "Opportunity Name" },
    "task-3": { id: "task-3", content: "Task Name" },
    "task-4": { id: "task-4", content: "Message" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Messaging Tool",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "Build Your Message",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2"],
};
export default initialData;
