<template>
 <div>
   <div>
     <bread-rumbs v-bind:breadCrumbsDate="this.breadCrumbsDate"/>
   </div>
   <div>
     <back-next v-bind:backNextData="this.backNextData"/>
   </div>
   <div>
      <NameGromad v-bind:nameGromad="this.nameGromad"/>
   </div>
   <div class="flex-box dataSelectInfo">
     <div class="selectInfo">
       <div @click="gromadInfo('about')" v-bind:class="about ? 'selectInfoActive' : 'selectInfoNone'">Про громаду</div>
       <div @click="gromadInfo('characteristics')" v-bind:class="characteristics ? 'selectInfoActive' : 'selectInfoNone'">Характеристики громади</div>
       <div @click="routerTo('/data')" class="selectInfoNone">Показники громади</div>
       <div @click="routerTo('/dataFromOblast')" class="selectInfoNone">Рейтинг по області</div>
       <div @click="routerTo('/dataFromUkraine')" class="selectInfoNone">Рейтинг по Україні</div>
     </div>
     <div class="dataInfo">
       <div v-if="about">
         <div class="paddingBottom20px" v-for="(index, idx) in getDatasGromad.about" :key="idx" >
           <strong class="stongInfo">{{idx}}: </strong><span class="textInfo">{{index}}</span>
         </div>
       </div>
       <div v-if="characteristics">
         <div class="paddingBottom20px" v-for="(index, idx) in getDatasGromad.characteristics" :key="idx">
           <strong class="stongInfo">{{idx}}: </strong><span class="textInfo">{{index}}</span>
         </div>
       </div>
     </div>
   </div>

 </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import router from "@/router";
import NameGromad from "@/views/nameGromad.vue";
import BackNext from "@/views/backNext.vue";
import breadRumbs from "@/views/breadRumbs.vue";


export default {
  name: "communitiesInfo",
  components: {breadRumbs, BackNext, NameGromad},
  data() {
    return {
      a: this.$route.path.split('/'),
      about: true,
      characteristics: false,
    }
  },
  methods: {
    ...mapActions(['GET_Gromad']),
    gromadInfo: function gromadInfo(data){
      if(data === 'about'){
        this.about = true
        this.characteristics = false
      }
      else if(data === 'characteristics'){
        this.about = false
        this.characteristics = true
      }
    },
    routerTo: function routerTo(data){
      let a = this.$route.path + data
      router.push(a)
    }
  },
  computed: {
    ...mapGetters(['getDatasGromad']),
    backNextData () {
      return '/' + this.a[1]
    },
    breadCrumbsDate () {
      return '/' + this.a[1]
    },
    nameGromad () {
      return {
        data: this.getDatasGromad.about,
        type: this.getDatasGromad.about
      }
    }
  },
  created() {
    this.GET_Gromad(this.a)
  }
}
</script>

<style scoped>
.selectInfo > div{
  padding: 24px 53px 24px 20px;
  border-bottom: 1px solid #666666;
  cursor:pointer;
  user-select: none;
}
.selectInfoNone{
  color:#666666;
  background-color:#ffffff;
}
.selectInfoNone:hover{
  background-color:#F0F0F0;
}
.selectInfoNone::after{
  content: 'ᐳ';
  float:right;
  padding-left:36px;
  color:#666666;
}
.selectInfoActive{
  color:#FFFFFF;
  background-color:#A0A0A0;
}
.selectInfoActive:hover{
  background-color:#A0A0A0;
  color:#FFFFFF;
}
.selectInfoActive::after{
  content: 'ᐳ';
  float:right;
  padding-left:36px;
  color:#FFFFFF;
}
.stongInfo{
  font-size:18px;
  font-style:normal;
  font-weight:500;
  line-height:25px;
  color:#333333;
}
.textInfo{
  font-size:16px;
  font-style:normal;
  font-weight:400;
  line-height:25px;
  color:#333333;
  padding-left:3px;
}
.dataInfo{
  margin-left:108px;
}
.dataSelectInfo{
  margin-top:8vh;
  margin-left:5vw;
}
</style>
