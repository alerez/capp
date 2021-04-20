import Vue from 'vue'
import VueRouter from 'vue-router'
import mainPageMap from "@/views/mainPageMap";
import districtsCommunities from "@/views/districtsCommunities";
import communitiesInfo from "@/views/communitiesInfo";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainPageMap',
    component: mainPageMap
  },
  {
    path: '/:id',
    name: 'mainPageMap',
    component: mainPageMap
  },
  {
    path: '/:id/:id',
    name: 'districtsCommunities',
    component: districtsCommunities,
  },
  {
    path: '/:id/:id/:id',
    name: 'communitiesInfo',
    component: communitiesInfo,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
