<template>
  <div>
    <div>

    </div>
    <div>

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

export default {
  name: "districtsCommunities",
  data() {
    return {
      routerID: this.$route.params.id,
      selectRegion: ''
    }
  },
  computed: {
    ...mapGetters(['getNameOblasti'])
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
  padding-bottom:30px;
}
</style>
