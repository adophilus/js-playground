<script lang="ts" setup>
import { ref } from 'vue'

const newTask = ref("")
const error = ref("")

const emit = defineEmits<{
    addTask: [newTask: string]
}>();

const formSubmitted = () => {
    const newTaskTitle = newTask.value.trim()
    if (!newTaskTitle) {
        error.value = "Task title is required"
        return
    }
    error.value = ""
    newTask.value = ""
    emit("addTask", newTaskTitle)
}
</script>

<template>
    <form @submit.prevent="formSubmitted">
        <label>New Task
            <input v-model="newTask" name="newTask" @change="error = ''" :aria-invalid="!!error || undefined">
            <small v-if="!!error" id="invalid-helper">
                {{ error }}
            </small>
        </label>
        <div class="button-container">
            <button type="submit">Add</button>
        </div>
    </form>
</template>
