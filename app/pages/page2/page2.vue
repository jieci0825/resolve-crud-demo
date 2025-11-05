<script setup>
import { ref } from 'vue'

const content = ref('')
console.log('page2 init')
</script>

<template>
    <h1>Vue-page2</h1>
    <input
        type="text"
        v-model="content"
    />
    <div>{{ content }}</div>
</template>

<style scoped lang="scss">
h2 {
    color: blueviolet;
}
</style>
