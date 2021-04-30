<template>
  <div class="breadRumbs">
    <div>
      <router-link to="/">Головна</router-link>
    </div>
    <div>
      <svg width="1" height="20" viewBox="0 0 1 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.5" y1="-2.18557e-08" x2="0.500001" y2="20" stroke="#666666"/>
      </svg>
    </div>
    <div>
      <div v-for="(index, idx) in getNameOblasti" :key="idx">
        <div v-if="idx === $attrs.breadCrumbsDate.replace('/', '')">
          <router-link :to="$attrs.breadCrumbsDate">{{ index.name }} область</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "breadRumbs",
  computed: {
    ...mapGetters(['getNameOblasti'])
  }
}
</script>

<style scoped>
.breadRumbs{
  display:flex;
  margin-left:6vw;
}
.breadRumbs > div{
  margin:3px;
}
a{
  text-decoration:none;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color:#666;
}
</style>
