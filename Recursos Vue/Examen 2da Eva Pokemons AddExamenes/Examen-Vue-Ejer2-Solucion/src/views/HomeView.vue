<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/TX.jpg">
    <HelloWorld msg="Welcome to Vue.js Exam "/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
