<template v-if="this.dataValue">
  <div>
    <div>

    </div>
    <div>

    </div>
<!--    <div style="display:flex;">-->
<!--      <div class="selectData">-->
<!--        <div v-for="(index, idx) in dataGroups" :key="index">-->
<!--          <div class="selectRegionDataStyle" @click="selectRegionFunc(idx)">-->
<!--            <p>{{index.name}}</p>-->
<!--&lt;!&ndash;            = index.name[0].toUpperCase() + index.name.substring(1).toLowerCase()&ndash;&gt;-->
<!--          </div>-->
<!--            <div v-for="(indexs, idxs) in index.vars" :key="idxs" @click="selectRegionSelectDataFunc(idxs)" class="selectRegionSelectData">-->
<!--              <div v-if="idx === selectRegionIdx">-->
<!--                <p>{{indexs.name}}</p>-->
<!--                {{idxs}}-->
<!--              </div>-->
<!--              <p>{{indexs}}</p>-->
<!--              </div>-->
<!--          </div>-->
<!--      </div>-->
<!--&lt;!&ndash;      <div v-if="this.selectRegionIdx === 'ДЕМОГРАФІЯ'" class="selectRegionDataSelect">&ndash;&gt;-->
<!--&lt;!&ndash;        <div v-for="(indexs, idxs) in this.dataGroupsSelectRegionVars" :key="idxs" @click="selectRegionSelectDataFunc(idxs)" class="selectRegionSelectData">&ndash;&gt;-->
<!--&lt;!&ndash;          <p>{{indexs.name}}</p>&ndash;&gt;-->
<!--&lt;!&ndash;          {{idxs}}&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div v-else-if="this.dataGroups === 'ЕКОНОМІКА'" class="selectRegionDataSelect">&ndash;&gt;-->
<!--&lt;!&ndash;        <div v-for="(indexs, idxs) in this.dataGroupsSelectRegionVars" :key="idxs" @click="selectRegionSelectDataFunc(idxs)" class="selectRegionSelectData">&ndash;&gt;-->
<!--&lt;!&ndash;          <p>{{indexs.name}}</p>&ndash;&gt;-->
<!--&lt;!&ndash;          {{idxs}}&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--    </div>-->
    <div class="selectData">
      <div style="display:flex">
        <div>
          <div v-for="(index, idx) in getDatasGromad.groups" :key="idx">
          <div @click="selectRegionFunc(idx)" v-bind:class="(idx === selectRegionIdx) ? 'selectRegionDataActive' : 'selectRegionData' " class="selectRegionDataStyle">
            {{index.name = index.name[0].toUpperCase() + index.name.substring(1).toLowerCase()}}
          </div>
          <!--          <div v-if="idx === selectRegionIdx">-->
          <!--            <div style="margin-left:20px" v-for="(indexs, idxs) in dataGroupsSelectRegionVars" :key="idxs" @click="selectRegionSelectDataFunc(idxs)" class="selectRegionSelectData">-->
          <!--              {{indexs.name}}-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
        </div>
        <div style="margin-top:-5px;">
          <div v-for="(indexs, idxs) in dataGroupsSelectRegionVars" :key="idxs" @click="selectRegionSelectDataFunc(idxs)" v-bind:class="(idxs === selectRegionSelectDataIdx) ? 'selectRegionSelectDataActive' : 'selectRegionSelectData' " class="selectRegionDataSelect">
            {{indexs.name}}
          </div>
        </div>
      </div>
      <div v-for="indexss in dataGroupsSelectRegionVarsDataIdx" :key="indexss">
        <div v-if="indexss === selectRegionSelectDataIdx">
          <chart-views class="charts"/>
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

    dataGroups () {
      return this.getDatasGromad.groups
    },
    dataGroupsSelectRegion () {
      let selectRegion = this.selectRegionIdx;
      return this.dataGroups[selectRegion]
    },
    dataGroupsSelectRegionVars () {
      return this.dataGroupsSelectRegion['vars']
    },
    dataGroupsSelectRegionVarsDataIdx () {
      return this.dataGroupsSelectRegionVars[this.selectRegionSelectDataIdx]
    },
    dataValue () {
      return this.dataGroupsSelectRegionVarsDataIdx.values
    },



  },
  methods: {
    ...mapActions(['GET_Gromad', 'UPPDATE_CHART']),
    selectRegionFunc: function selectRegionFunc(idx){
      if (this.selectRegionIdx === idx){
        this.selectRegionSelectDataIdx = ''
        this.selectRegionIdx = idx
      }
      else{
        this.selectRegionIdx = idx
        this.dataCharts = {
          data: this.dataValue
        }
        this.UPPDATE_CHART(this.dataCharts);
      }
    },
    selectRegionSelectDataFunc: function selectRegionSelectDataFunc(idxs){
      this.selectRegionSelectDataIdx = idxs
        this.dataCharts = {
          data: this.dataValue
        }
      this.UPPDATE_CHART(this.dataCharts);
    }
  },
  async created() {
    await this.GET_Gromad(this.a)
    this.dataCharts = {
      data: this.dataValue
    }
    await this.UPPDATE_CHART(this.dataCharts);
  },
}
</script>

<style scoped>
.selectData{
  display:flex;
  margin-left:5vw;
  margin-top:10vh;
}

.selectRegionDataStyle{
  width:250px;
  cursor:pointer;
  padding:16px;
}
.selectRegionDataStyle > p{
  width:136px;
  font-weight: 500;
  font-size: 18px;
  font-style: normal;
}
.selectRegionDataStyle::after{
  content:">";
  float:right;
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
  margin-left:20px;
  margin-right:30px;

  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;

  cursor:pointer;
}

.selectRegionSelectData{
  width:196px;
  margin-top:16px;
  padding-top:2px;
  padding-bottom:18px;

  color: #666666;

  cursor:pointer;
}
.selectRegionSelectDataActive{
  width:196px;
  margin-top:16px;
  padding-top:2px;
  padding-bottom:18px;

  border-top: 2px solid #3532DD;

  color: #333333
}

.charts{
  width:650px;
}
</style>
