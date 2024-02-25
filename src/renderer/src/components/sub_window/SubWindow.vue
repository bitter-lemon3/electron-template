<template>
    <el-button type="primary" @click="plot">plot</el-button>
</template>
<script setup lang="ts">
  import { useRoute } from 'vue-router';
  const route = useRoute()
  console.log('route.path',route.path)
  let newWindowNum = 0
  const plot=()=>{
    //const newWindow = {name:`subsubwindow${newWindowNum}`,path:route.path}
    //window.electron.ipcRenderer.send('newWindow',newWindow)
    const windowParam = {url:route.path.split('/')[route.path.split('/').length-1]+'/subsub/'+'subsubwindow'+newWindowNum,
    name:`subsubwindow${newWindowNum}`,
  width: 800,
  height: 600}
  console.log(windowParam)
    window.electron.ipcRenderer.send('loadWindow',windowParam)
    newWindowNum++
  }
</script>