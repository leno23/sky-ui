<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test'
// import Player from './components/Player.vue'
const onClick = () => {
  console.log("test被点击了")
}
</script>

<template>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <Test @click='onClick'>
    <template #default>defaultContent</template>
    <template #title>
      <div class='flex items-center justify-center'>
        <div class='text-sky-400 font-bold border flex items-center hover:bg-blue-500 hover:text-white cursor-pointer transition-all w-20 border-blue-600  px-5 pt-2 pb-2  m-2 rounded-xl'>标题</div>
      </div>
    </template>
  </Test>
  <s-button type='primary'>按钮</s-button>
  <!-- <Player/> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
