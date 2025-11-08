<script setup>
import { ref } from 'vue'
import './page1.css'
import curl from '$common/curl'

const content = ref('')

const tableData = ref([{ name: 'aaa', id: '1', desc: 'aaa-desc' }])

async function getProjectList() {
    const { success, data } = await curl({
        method: 'get',
        url: '/api/project/list'
    })

    if (!success) {
        return
    }

    tableData.value = data
}

getProjectList()
</script>

<template>
    <h1>Vue-page1</h1>
    <el-input
        v-model="content"
        placeholder="请输入文本"
    ></el-input>
    <div>{{ content }}</div>

    <div class="table-area">
        <el-table
            :border="true"
            :data="tableData"
            style="width: 100%"
        >
            <el-table-column
                prop="id"
                label="ID"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="项目名称"
            >
            </el-table-column>
            <el-table-column
                prop="desc"
                label="项目描述"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<style scoped lang="scss">
h1 {
    color: red;
}

.table-area {
    margin-top: 20px;
}
</style>
