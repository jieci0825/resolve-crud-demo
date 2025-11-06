<script setup>
import { ref } from 'vue'
import { sum } from '$common/utils'
import './page1.css'

const content = ref('')
console.log('page1 init', sum(1, 2))
</script>

<template>
    <h1>Vue-page1</h1>
    <input
        type="text"
        v-model="content"
    />
    <div>{{ content }}</div>
</template>

<style scoped lang="scss">
h1 {
    color: red;
}
</style>
