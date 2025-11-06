<script setup>
import { ref } from 'vue'
import { sum } from '$common/utils'

const content = ref('')
console.log('page2 init', sum(10, 20))
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
h1 {
    color: blueviolet;
}
</style>
