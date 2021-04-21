<template>
 <div>
    <div>

    </div>
   <div>

   </div>
   <div>

   </div>
   <div class="flex-box">
     <div class="selectInfo">
       <div @click="gromadInfo('about')" v-bind:class="about ? 'selectInfoActive' : 'selectInfoNone'">Про громаду</div>
       <div @click="gromadInfo('characteristics')" v-bind:class="characteristics ? 'selectInfoActive' : 'selectInfoNone'">Характеристики громади</div>
       <div>Показники громади</div>
       <div>Рейтинг по області</div>
       <div>Рейтинг по Україні</div>
     </div>
     <div>
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


export default {
  name: "communitiesInfo",
  data() {
    return {
      a: this.$route.path.split('/'),
      about: true,
      characteristics: false
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
    }
  },
  computed: {
    ...mapGetters(['getDatasGromad']),
  },
  created() {
    this.GET_Gromad(this.a)
  }
}
</script>

<style scoped>
.selectInfo > div{
  padding: 24px 63px 24px 20px;
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
.selectInfoNone::before{
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
.selectInfoActive::before{
  content: 'ᐳ';
  float:right;
  padding-left:36px;
  color:#FFFFFF;
}
.stongInfo{
  font-size:16px;
  font-style:normal;
  font-weight:500;
  line-height:25px;
  color:#333333;
}
.textInfo{
  font-size:14px;
  font-style:normal;
  font-weight:400;
  line-height:25px;
  color:#333333;
}
</style>
