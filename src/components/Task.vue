<template>
  <div @dblclick="handleToggleReminder(task)" v-bind:class="[task.reminder ? 'reminder' : '', 'task']">
    <div v-bind:class="[completed ? 'completed' : '']">
      <div class="header">
        <h3 v-bind:contenteditable="isEditable" ref="task_header">
          {{ task.text }}
        </h3>
        <div class="icons">
          <i class="fas fa-times" v-if="!completed" @click="onDelete(task)"></i>
          <!-- Edit Section -->
          <i v-if="!completed && !isEditable" @click="onEdit()" class="fa fa-pencil"></i>
          <i v-if="!completed && isEditable" @click="onEdit()" class="fa-solid fa-pen-to-square"></i>
          <!-- Toggle Complete Section -->
          <i v-if="!completed" class="fa fa-check" @click="onCompleteToggle(task)"></i>
          <i v-else class="fa-solid fa-arrow-up" @click="onCompleteToggle(task)"></i>
        </div>
      </div>
      <p v-bind:contenteditable="isEditable" ref="task_day">
        {{ task.day }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskComponent",
  props: {
    task: Object,
    completed: Boolean,
  },
  data() {
    return {
      isEditable: false,
    };
  },
  methods: {
    handleToggleReminder(task) {
      this.$store.dispatch("toggleReminder", task.id);
    },
    onDelete(task) {
      this.$store.dispatch("deleteTask", task.id);
    },
    onCompleteToggle(task) {
      this.$store.dispatch("completeToggle", task.id);
    },
    onEdit() {
      if (this.isEditable) {
        //Handle Edit
        let taskDay = this.$refs.task_day.innerText;
        let taskHeader = this.$refs.task_header.innerText;
        if (taskDay.length > 0 && taskHeader.length > 0) {
          const editedTask = {
            id: this.task.id,
            text: taskHeader,
            day: taskDay,
            reminder: this.task.reminder,
            completed: this.task.completed,
            createdBy: this.$store.state.userName,
          }
          console.log(editedTask, "editedTask");
          this.$store.dispatch("editTask", editedTask);
        } else {
          this.$refs.task_header.innerText = this.task.text;
          this.$refs.task_day.innerText = this.task.day;
          alert("Task and Day fields cannot be empty");
        }
      }
      this.isEditable = !this.isEditable;
    },
  },
};
</script>
<style scoped>
.fas {
  color: red;
}

.fa-check,
.fa-solid {
  color: green;
  margin-left: 13px;
}

.fa-pencil,
.fa-pen-to-square {
  margin-left: 13px;
  font-size: 13px;
}

.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.task.reminder {
  border-left: 5px solid green;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.completed {
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  text-decoration-color: red;
  opacity: 0.3;
}
</style>
