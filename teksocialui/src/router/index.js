import { createRouter, createWebHistory } from 'vue-router'
import ProfileDetails from '../components/ProfileDetails.vue'
import SideNav from '../components/SideNav.vue'




const routes = [
  {
    path: '/',
    name: 'ProfileDetailsView',
    component: ProfileDetails
  },
  {
    path: '/side',
    name: 'SideNav',
    component: SideNav
  },
  


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
