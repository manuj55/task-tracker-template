<template>
  <header>
    <div class="header">
      <h1>{{ title }}</h1>
      <i
        v-if="isUserLoggedIn"
        class="fa fa-power-off"
        @click="handleLogout()"
      ></i>
    </div>
    <Login v-bind:isUserLoggedIn="isUserLoggedIn" />
  </header>
</template>

<script>
import Button from "./Button";
import Login from "./Login.vue";

export default {
  name: "Header",
  props: {
    title: String,
    showAddTask: Boolean,
    isUserLoggedIn: Boolean,
  },
  components: {
    Button,
    Login,
  },
  methods: {
    handleToggleAddTask() {
      this.$emit("toggle-AddTask");
    },
    handleLogout() {
      this.$store.commit("userNotAuthenticated");
    },
    isHomePage() {
      //Handle The logic
    },
  },
  emits: ["toggle-AddTask"],
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-direction: column;
}
.header {
  display: flex;
  align-items: center;
}
.buttons {
  display: flex;
}
.fa-power-off {
  position: relative;
  left: 45%;
  font-size: 20px;
  color: red;
}
</style>
