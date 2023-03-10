import { createRouter, createWebHistory } from 'vue-router'
import ProfileDetails from '../components/ProfileDetails.vue'
import SideNav from '../components/SideNav.vue'
// import ProfileDetails from '../components/ProfileDetails.vue'
import Home from '../components/Home.vue'
import Friends from '../components/Friends.vue'
import Chatbox from '../components/Chatbox.vue'
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
  {
    path: '/friends',
    name: 'friends-list',
    component: Friends,
    
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chatbox,
    
  }

 


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


