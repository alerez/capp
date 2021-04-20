<template>
 <div>
    <div>

    </div>
   <div>

   </div>
   <div>

   </div>
   <div>
     <div>
       <div>
         Про громаду
       </div>
       <div>
         Характеристики громади
       </div>
       <div>
         Показники громади
       </div>
       <div>
         Рейтинг по області
       </div>
       <div>
         Рейтинг по Україні
       </div>
     </div>
     <div>
       <div>
         <div v-for="(index, idx) in getDatasGromad.about" :key="idx">
           <strong>{{idx}}: </strong>{{index}}
         </div>
       </div>
       <div>
         <div v-for="(index, idx) in getDatasGromad.characteristics" :key="idx">
           <strong>{{idx}}: </strong>{{index}}
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
    }
  },
  methods: {
    ...mapActions(['GET_Gromad']),
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

</style>
