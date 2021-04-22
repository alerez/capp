<template>
  <div>
    <div>

    </div>
    <div>

    </div>
    <div v-for="(index, idx) in getDatasGromad.groups" :key="idx">
      <div>
        {{idx}}
      </div>
      <div style="margin-left:20px" v-for="(indexs, idxs) in index['vars']" :key="idxs">
        {{idxs}}
        <div v-for="(values, valuesID) in indexs['values'][0]" :key="valuesID">
          <div style="margin-left:20px">{{valuesID}} : {{values}}</div>
        </div>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "regionData",
  data() {
    return {
      a: this.$route.path.split('/'),
    }
  },
  computed: {
    ...mapGetters(['getDatasGromad']),
  },
  methods: {
    ...mapActions(['GET_Gromad']),
  },
  created() {
    this.GET_Gromad(this.a)
  }
}
</script>

<style scoped>

</style>
