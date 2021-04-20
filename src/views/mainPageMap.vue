<template>
 <div>
   <div>
     <h1>Цифрова аналітика і оцінка ефективності громад</h1>
   </div>
   <div>
     <div>
       <select v-model="optionsValue">
         <option disabled value="">Выберите область</option>
         <option v-for="(getNameOblastis, idx) in this.getNameOblasti" :value="getNameOblastis.id" :key="idx">{{ getNameOblastis.name }}</option>
       </select>
       <div v-on:click="pushOblastiRoute(optionsValue, idx)">
         <button>перейти</button>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import {mapGetters} from 'vuex'
import router from "@/router";
export default {
  name: "mainPageMap",
  data (){
    return {
      optionsValue: ''
    }
  },
  computed: {
    ...mapGetters(
        [
            'getNameOblasti'
        ]
    )
  },
  methods: {
    pushOblastiRoute: function pushOblastiRoute(data, dataId) {
      this.$route.path = dataId
      router.push(data)
    }
  }
}
</script>

<style scoped>

</style>
