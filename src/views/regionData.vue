<template>
  <div>
    <div>

    </div>
    <div>

    </div>
    <div style="display:flex;">
      <div class="selectData">
        <div v-for="(index, idx) in getDatasGromad.groups" :key="idx">
          <div class="selectRegionDataStyle" @click="selectRegionFunc(idx)">
            <p>{{index.name = index.name[0].toUpperCase() + index.name.substring(1).toLowerCase()}}</p>
          </div>
        </div>
      </div>
      <div class="selectRegionDataSelect">
        <div v-for="(indexs, idxs) in getDatasGromad.groups[selectRegionIdx]['vars']" :key="idxs" @click="selectRegionSelectDataFunc(idxs)" class="selectRegionSelectData">
          <p>{{indexs.name}}</p>
        </div>
      </div>
    </div>
    <div>
      <div v-for="indexss in getDatasGromad.groups[selectRegionIdx].vars[selectRegionSelectDataIdx].values" :key="indexss">
        <div v-if="indexss">
          {{indexss}}
          <chart-views/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ChartViews from "@/views/chartViews";

export default {
  name: "regionData",
  components: {ChartViews},
  data() {
    return {
      a: this.$route.path.split('/'),
      selectRegion: 'ДЕМОГРАФІЯ',
      selectRegionIdx: 'ДЕМОГРАФІЯ',
      selectRegionSelectData: 'Iж',
      selectRegionSelectDataIdx: 'Iж',
      dataCharts: {},
      chartRender: true
    }
  },
  computed: {
    ...mapGetters(['getDatasGromad']),
  },
  methods: {
    ...mapActions(['GET_Gromad', 'UPPDATE_CHART']),
    selectRegionFunc: function selectRegionFunc(idx){
      this.selectRegionIdx = idx
        this.dataCharts = {
          data: this.getDatasGromad.groups[this.selectRegionIdx].vars[this.selectRegionSelectDataIdx].values
        }
      this.UPPDATE_CHART(this.dataCharts);
    },
    selectRegionSelectDataFunc: function selectRegionSelectDataFunc(idxs){
      this.selectRegionSelectDataIdx = idxs
        this.dataCharts = {
          data: this.getDatasGromad.groups[this.selectRegionIdx].vars[this.selectRegionSelectDataIdx].values
        }
      this.UPPDATE_CHART(this.dataCharts);
    }
  },
  async created() {
    await this.GET_Gromad(this.a)
    this.dataCharts = {
      data: this.getDatasGromad.groups[this.selectRegionIdx].vars[this.selectRegionSelectDataIdx].values
    }
    await this.UPPDATE_CHART(this.dataCharts);
  },
}
</script>

<style scoped>
.selectData{
  border:solid 1px #333333;
  display:block;
  width:550px;
}

.selectRegionDataStyle{
  width:280px;
  height:66px;
  cursor:pointer;
}
.selectRegionDataStyle > p{
  width:156px;
  font-weight: 500;
  font-size: 18px;
  font-style: normal;
}
.selectRegionDataStyle::after{
  content:">";
  float:right;
  margin-right:14px;
  cursor:pointer;
}


.selectRegionData{
   color: #666666;
 }
.selectRegionData::after{
  color: #666666;
}
.selectRegionDataActive{
  color: #FFFFFF;
  background: #A0A0A0;
}
.selectRegionDataActive::after{
  color: #FFFFFF;
}



.selectRegionDataSelect{
  position:absolute;

  margin-left:300px;

  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;

  cursor:pointer;
}

.selectRegionSelectData{
  width:226px;
  margin-top:16px;
  padding-top:2px;
  padding-bottom:18px;

  color: #666666;
}
.selectRegionSelectDataActive{
  width:226px;
  margin-top:16px;
  padding-top:2px;
  padding-bottom:18px;

  border-top: 2px solid #3532DD;

  color: #333333
}
</style>
