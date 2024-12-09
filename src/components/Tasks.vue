<template>
  <div>
    <h3>Tasks</h3>
  </div>
</template>

<script>
import Task from "./Task.vue";
export default {
  name: "TasksComponent",
  props: {
    completedTasks: Array,
    inCompleteTasks: Array,
  },
  components: {
    Task,
  },
};
</script>

<style scoped>
.status_info {
  text-align: center;
  margin-top: 25px;
  color: #d2691e;
}
.completed {
  border-top: 2px solid grey;
  opacity: 0.3;
}
</style>
