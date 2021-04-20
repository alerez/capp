<template>
  <div>
    <div>

    </div>
    <div>

    </div>
    <div>
      <div v-if="getNameOblasti[routerID]">
        <div v-for="(index, idx) in getNameOblasti[routerID]['regions']">
          {{index.name}}
          <div style="color:#3532DD; margin-left:20px;" v-for="(indexs) in index.gromadas">
            <router-link :to="`/${routerID}/${idx}/${indexs.id}`" v-if="indexs.indicators">{{indexs.name}}</router-link>
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
      routerID: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters(['getNameOblasti'])
  },
}
</script>

<style scoped>

</style>
