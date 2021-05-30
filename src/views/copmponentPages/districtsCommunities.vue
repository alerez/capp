<template>
  <div>
    <div>
      <bread-rumbs v-bind:breadCrumbsDate="this.breadCrumbsDate"/>
    </div>
    <div>
      <back-next v-bind:backNextData="this.backNextData"/>
    </div>
    <div class="center-flex">
      <div class="divRegion" v-if="getNameOblasti[routerID]">
        <div @click="selectedRegion(index.id)" class="flex-box-rov" v-for="(index, idx) in getNameOblasti[routerID]['regions']">
          <div>
            <div class="h2" v-bind:class="selectRegion === index.id ? 'h2Font' : 'h2FontNone'">{{index.name}} район</div>
              <div class="divGromadLink" v-for="(indexs) in index.gromadas">
                <router-link :to="`/${routerID}/${idx}/${indexs.id}`" v-if="(indexs.indicators) && (selectRegion === index.id)">
                  {{indexs.name}} {{indexs.type}} територіальна громада
                </router-link>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import BackNext from "@/views/componentView/backNext.vue";
import breadRumbs from "@/views/componentView/breadRumbs.vue";

export default {
  name: "districtsCommunities",
  components: {breadRumbs, BackNext},
  data() {
    return {
      a: this.$route.path.split('/'),
      routerID: this.$route.params.id,
      selectRegion: '',
      backNextData: '/',
    }
  },
  computed: {
    ...mapGetters(['getNameOblasti']),
    breadCrumbsDate () {
      return '/' + this.a[1]
    }
  },
  methods: {
    selectedRegion: function selectedRegion(data){
      if(this.selectRegion === data)
        this.selectRegion = ''
      else
        this.selectRegion = data;
    }
  }
}
</script>

<style scoped>
.divRegion > div{
  width:1146px;
  min-height:109px;
  max-height:1000px;
  border-bottom: 1px solid #666666;
}
.divRegion > div > div{

}
.h2{
  font-weight:500;
  line-height:29px;
  font-size:24px;
  color: #333;
  user-select: none;
  padding:40px;
  width:1146px;
}
.h2:hover{
  background-color:#f0f0f0;
  cursor:pointer;
}
.h2Font::after{
  display:block;
  content:'-';
  float:right;
  margin-right:46px;
}
.h2FontNone::after{
  content:'+';
  float:right;
  margin-right:46px;
}
.h2Font{

}
a{
  margin-left:98px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #333333;
  text-decoration:none;
  position: relative;
  display:block;
  padding-top:20px;
  padding-bottom:20px;
}
a:hover{
  padding-left:10px;
}
a:hover:after{
  margin-left:10px;
  content: ">";
}
.divGromadLink{

}
.divGromadLink:hover{
  background-color:#F0F0F0;
}
</style>
