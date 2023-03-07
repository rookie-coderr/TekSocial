import { createRouter, createWebHistory } from 'vue-router'
import ProfileDetails from '../components/ProfileDetails.vue'
import SideNav from '../components/SideNav.vue'
// import ProfileDetails from '../components/ProfileDetails.vue'
import Home from '../components/Home.vue'
import signup_login from '../components/signup_login.vue'


const routes = [
  {
    path: '/',
    name: 'signup_login',
    component: signup_login,
    
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: ProfileDetails,
    
  },

 


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


