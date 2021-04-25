import Vue from 'vue'
import VueRouter from 'vue-router'
import mainPageMap from "@/views/mainPageMap";
import districtsCommunities from "@/views/districtsCommunities";
import communitiesInfo from "@/views/communitiesInfo";
import regionData from "@/views/regionData";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainPageMap',
    component: mainPageMap
  },
  {
    path: '/:id',
    name: 'districtsCommunities',
    component: districtsCommunities,
  },
  {
    path: '/:id/:id/:id',
    name: 'communitiesInfo',
    component: communitiesInfo,
  },
  {
    path: '/:id/:id/:id/data',
    name: 'regionData',
    component: regionData,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
