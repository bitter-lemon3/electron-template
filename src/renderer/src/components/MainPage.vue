<template>
    <el-button @click="create">create button</el-button>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  const route = useRoute()
  console.log(route.path)
  let newWindowNum = 0
    const create = () => {
    const newWindow = {name:`subwindow${newWindowNum}`,path:route.path}
    window.electron.ipcRenderer.send('newWindow',newWindow)
    newWindowNum++
    }
</script>