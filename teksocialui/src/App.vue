<template>
  <div class="app">
    <div class="sidebar">
      <SideNav />
    </div>
    <div class="content" :class="sidebarClass">
      <router-view />
    </div>

  </div>

  
</template>



<script>
import SideNav from './components/SideNav.vue';




export default {
  name: 'App',
  components: {
    SideNav
  }
}
</script>



<style lang="scss">

#app{
  position: relative;
  margin-left: 100px;
  margin-top: 0px;
}

.sidebar{
  position: relative;
  z-index: 1;
}

</style>


