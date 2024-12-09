<template>
  <div class="container">
    <Header title="Task Tracker" v-bind:showAddTask="showAddTask" v-bind:isUserLoggedIn="$store.state.isUserLoggedIn"
      @toggle-AddTask="handleToggleAddTask" />
    <router-view v-if="$store.state.isUserLoggedIn" v-bind:showAddTask="showAddTask" v-bind:userName="userName" />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { localHost } from "./urls";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      showAddTask: false,
      isLoggedIn: false,
      userName: null,
    };
  },
  methods: {
    handleToggleAddTask() {
      this.showAddTask = !this.showAddTask;
    },
  },
  async created() {
    //Handle If UserExists in Session
    let username = sessionStorage.getItem("username");
    const decodedUsername = window.atob(username);
    //make a database call and check if user exisit in the database
    let url = `${localHost}/users?email=${decodedUsername}`;
    const user = await fetch(url);
    const userData = await user.json();
    if (userData.length === 1) {
      this.$store.commit("parseUserName", decodedUsername);

    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Poppins", sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
