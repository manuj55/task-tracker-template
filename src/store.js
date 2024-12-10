import { createStore } from "vuex";
import * as util from "./util";

export default createStore({
  state: {
    completedTasks: [],
    inCompleteTasks: [],
    isUserLoggedIn: false,
    userName: null,
  },
  getters: {},
  mutations: {
    parseUserName(state, userName) {
      // const decodedEmail = window.atob(userName); // decode the string
      state.userName = userName;
      state.isUserLoggedIn = true;
      //add below line make state variable persistent
      // state.isLoginActive = false;
      // state.isRegisterActive = false;
    },
    userAuthenticated(state, email) {
      //User Authenticated
      state.isUserLoggedIn = true;
      state.userName = email;
      const encodedEmail = window.btoa(email); // encode the string
      sessionStorage.setItem("username", encodedEmail);
    },
    userNotAuthenticated(state) {
      //User Not Authenticated
      state.isUserLoggedIn = false;
      //optional 
      sessionStorage.removeItem("username");
    },
    setTasks(state, tasks) {
      state.completedTasks = tasks.filter((task) => task.completed == true);
      state.inCompleteTasks = tasks.filter((task) => task.completed == false);
    },
    toggleTasks(state, updatedTask) {
      state.inCompleteTasks = [...updatedTask];
    },
    addNewTask(state, newTask) {
      //Add new task
      state.inCompleteTasks = [...state.inCompleteTasks, newTask];
    },
    deleteTask(state, id) {
      state.inCompleteTasks = state.inCompleteTasks.filter((t) => t.id != id);
    },
    completeTask(state, { newTask, id }) {
      if (newTask.completed) {
        state.completedTasks = [...state.completedTasks, newTask];
        state.inCompleteTasks = state.inCompleteTasks.filter((t) => t.id != id);
      } else {
        state.inCompleteTasks = [...state.inCompleteTasks, newTask];
        state.completedTasks = state.completedTasks.filter((t) => t.id != id);
      }
      //handle completeTask Toggle
    },
  },
  actions: {
    async fetchTasks(state) {
      const tasks = await util.fetchTasks();
      state.commit("setTasks", tasks);
    },
    async toggleReminder(state, id) {
      //Toggle Reminder implement
    },
    async addTask(state, newTask) {
      //Handle New Task
      const task = await util.addNewTask(newTask);
      state.commit("addNewTask", task);
    },
    async completeToggle(state, id) {
      const data = await util.completeToggle(id);
      state.commit("completeTask", { newTask: data, id });
    },
    async editTask(state, editedTask) {
      await util.editTask(editedTask);
    },
    async deleteTask(state, id) {
      const res = await util.deleteTask(id);
      if (res.status == 200) {
        state.commit("deleteTask", id);
      } else {
        alert("Error Deleting Task");
      }
    },
  },
  modules: {},
});
