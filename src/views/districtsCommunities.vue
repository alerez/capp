<template>
  <div>
    <div>

    </div>
    <div>

    </div>
    <div class="center-flex">
      <div class="divRegion" v-if="getNameOblasti[routerID]">
        <div class="flex-box-rov" v-for="(index, idx) in getNameOblasti[routerID]['regions']">
          <div @click="selectedRegion(index.id)">
            {{index.name}}
            <div v-if="selectRegion === index.id">
              <div style="color:#3532DD; margin-left:20px;" v-for="(indexs) in index.gromadas">
                <router-link :to="`/${routerID}/${idx}/${indexs.id}`" v-if="indexs.indicators">{{indexs.name}}</router-link>
              </div>
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
      selectRegion: 'Kirovohradska'
    }
  },
  computed: {
    ...mapGetters(['getNameOblasti'])
  },
  methods: {
    selectedRegion: function selectedRegion(data){
      this.selectRegion = data;
    }
  }
}
</script>

<style scoped>
.divRegion > div{
  width:1146px;
  height:109px;
  border-bottom: 1px solid #666666;
}
</style>
