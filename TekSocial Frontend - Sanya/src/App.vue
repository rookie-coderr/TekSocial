<template>
  <div class="app">
    <div class="sidebar">
      <SideNav v-if="!isLogin" @toggle-menu="ToggleMenu" />
    </div>
    <div class="content" :class="sidebarClass">
      <router-view />
    </div>
  </div>
</template>



<script>
import SideNav from './components/SideNav.vue';
import 'bootstrap/dist/css/bootstrap.css';
import signup_login from './components/signup_login.vue';


export default {
  name: 'App',
  components: {
    SideNav,
    signup_login
  },
  data() {
    return {
      isSidebarExpanded: false
    };
  },
  methods: {
    ToggleMenu(is_expanded) {
      this.isSidebarExpanded = is_expanded;
    }

  },
  computed : {
    isLogin(){
      return this.$route.path === '/';
    }
  }

};
</script>



<style lang="scss">


*body{
  margin: 0px;
  padding: 0px;
}

.sidebar {
  position: relative;
  z-index: 1;
}
</style>


