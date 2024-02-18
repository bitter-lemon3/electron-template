<template>
  <div style="box-shadow:  0 2px 2px rgba(0, 0, 0, 0.2);">
    <el-button @click="Add">Add</el-button>
  </div>
  <div v-for="(button,index) in buttons" :key="index">
    <el-button  @click="create(button)">{{ button }}</el-button>
  </div>
   
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  const route = useRoute()
  const buttons = ref([
    
  ]) as any
  const subwindows = ref({})
  //增加创建按键
  const Add = ()=>{
    const newButton = `button${buttons.value.length+1}`
    console.log(newButton)
    buttons.value.push(newButton)
    subwindows[newButton] = 0
  }
  console.log(route.path)

    const create = (buttonName) => {
      if(subwindows[buttonName]==0){
        const newWindow = {name:`subwindow${buttonName}`,path:route.path}
        window.electron.ipcRenderer.send('newWindow',newWindow)
      }
    
    }
    window.electron.ipcRenderer.on('subwindow-ready',(_event,buttonName)=>{
      console.log('buttonName',buttonName)
      subwindows[buttonName]=1
    })
    window.electron.ipcRenderer.on('subwindow-closed',(_event,buttonName)=>{
      console.log(buttonName)
      subwindows[buttonName]=0
    })

</script>