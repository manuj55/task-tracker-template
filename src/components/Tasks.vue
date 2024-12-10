<template>
  <div>

    <!-- Incompleted Tasks  -->
    <h3 v-if="inCompleteTasks.length > 0" class="status_info">In Progress Tasks</h3>
    <div class="tasks" v-for="task in inCompleteTasks" v-bind:key="task.id">
      <Task v-bind:task="task" v-bind:completed="false" />
    </div>



    <!-- Completed Tasks -->
    <h3 v-if="completedTasks.length > 0" class=" completed status_info">Completed</h3>
    <div class="tasks" v-for="task in completedTasks" v-bind:key="task.id">
      <Task v-bind:task="task" v-bind:completed="true" />
    </div>
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
