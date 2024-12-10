<template>
  <div v-if="showAddTask">
    <AddTask v-bind:userName="userName" />
  </div>
  <Tasks v-bind:completedTasks="$store.state.completedTasks" v-bind:inCompleteTasks="$store.state.inCompleteTasks" />
</template>

<script>
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";

export default {
  name: "HomeView",
  components: {
    Tasks,
    AddTask,
  },
  props: {
    showAddTask: Boolean,
    userName: String,
  },
  //Fetch Task using created
  async created() {
    this.$store.dispatch("fetchTasks");
  },
};
</script>
