<template>
  <h1 v-for="(name, index) in users" :key="index">Users {{ name }}</h1>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          name: "noman",
        },
        {
          name: "asraf",
        },
      ],
    };
  },
};
</script>

<style></style>
