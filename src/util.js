import { localHost } from "./urls";

export const fetchTasks = async () => {
  const res = await fetch(
    `${localHost}/tasks?createdBy=${window.atob(
      sessionStorage.getItem("username")
    )}`
  );
  const data = await res.json();
  return data;
};
export const fetchTask = async (id) => {
  const res = await fetch(`${localHost}/tasks/${id}`);
  const data = await res.json();
  return data;
};
export const toggleReminder = async (id) => {
  //Toggle Reminder
};

export const addNewTask = async (newTask) => {
  //Handle New Task
};

export const completeToggle = async (id) => {
  //Complete Toggle
};

export const editTask = async (updatedTask) => {
  //Edit Task Implement
};

export const deleteTask = async (id) => {
  const res = await fetch(`${localHost}/tasks/${id}`, {
    method: "DELETE",
  });
  return res;
};
