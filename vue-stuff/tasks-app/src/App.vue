<script setup lang="ts">
import { ref } from 'vue'
import type { TTask } from './types'
import TaskForm from "./components/TaskForm.vue";

const tasks = ref<TTask[]>([]);

const addTask = (task: string) => {
  tasks.value.push({
    id: String(tasks.value.length + 1),
    title: task,
    done: false
  })
};
</script>

<template>
  <main>
    <h1>Tasks App</h1>
    <TaskForm @add-task="addTask" />
    <article v-for="task in tasks" :key="task.id">{{ task.title }}</article>
  </main>
</template>

<style>
main {
  max-width: 800px;
  margin: 1rem auto;
}

.button-container {
  display: flex;
  justify-content: end;

  button[type="submit"] {
    width: auto;
  }
}
</style>
