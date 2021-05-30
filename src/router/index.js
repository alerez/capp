import Vue from 'vue'
import VueRouter from 'vue-router'
import mainPageMap from "@/views/copmponentPages/mainPageMap";
import districtsCommunities from "@/views/copmponentPages/districtsCommunities";
import communitiesInfo from "@/views/copmponentPages/communitiesInfo";
import regionData from "@/views/copmponentPages/regionData";
import regionPosition from "@/views/regionPosition";

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
  {
    path: '/:id/:id/:id/dataFromOblast',
    name: 'regionPosition',
    component: regionPosition,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
