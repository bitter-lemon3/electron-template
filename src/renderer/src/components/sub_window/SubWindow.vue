<template>
    <el-button type="primary" @click="plot">plot</el-button>
</template>
<script setup lang="ts">
  import { useRoute } from 'vue-router';
  const route = useRoute()
  console.log(route.path)
  let newWindowNum = 0
  const plot=()=>{
    const newWindow = {name:`subsubwindow${newWindowNum}`,path:route.path}
    window.electron.ipcRenderer.send('newWindow',newWindow)
    newWindowNum++
  }
</script>