<template>
  <button @click="onClick()" :style="{ background: color }" class="btn">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    color: String,
    text: String,
    eventName: String,
  },
  methods: {
    onClick() {
      this.$emit(this.eventName);
    },
  },
};
</script>

<style></style>
