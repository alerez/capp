<template>
  <div id="app">
    <menuPages class="menu"/>
    <router-view>

    </router-view>
    <footer-pages/>
  </div>
</template>

<style lang="scss">
*{
  padding:0;
  margin:0;
  box-sizing:border-box;
  font-family:Montserrat, sans-serif;
}
body{
  background-color:#FFFFFF;
}
.color-blue-bg{
  background-color: #3532DD;
}
.flex-box{
  display:flex;
  flex-direction:row;
}
.flex-box-rov{
  display:flex;
  flex-direction:row;
  align-items:center;
}
.menu{
  width:100vw;
  height:60px;
}
h1{
  font-style:normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #333333;
}
h2{

}
h3{

}
.paddingBottom20px{
  padding-bottom:20px;
}

</style>
<script>
import menuPages from "@/views/menuPages.vue";
import FooterPages from "@/views/footerPages";
import {mapActions} from "vuex"
export default {
  components: {FooterPages, menuPages},
  created() {
    this.GET_Map();
  },
  methods: {
    ...mapActions(['GET_Map'])
  },
}
</script>
