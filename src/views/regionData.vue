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
    <div style="display:flex">
      <div style="display:flex">
        <div>
          <div v-for="(index, idx) in getDatasGromad.groups" :key="idx">
          <div @click="selectRegionFunc(idx)" v-bind:class="(idx === selectRegionIdx) ? 'selectRegionDataActive' : 'selectRegionData' " class="selectRegionDataStyle">
            {{idx}}
          </div>
          <!--          <div v-if="idx === selectRegionIdx">-->
          <!--            <div style="margin-left:20px" v-for="(indexs, idxs) in dataGroupsSelectRegionVars" :key="idxs" @click="selectRegionSelectDataFunc(idxs)" class="selectRegionSelectData">-->
          <!--              {{indexs.name}}-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
        </div>
        <div>
          <div style="margin-left:20px" v-for="(indexs, idxs) in dataGroupsSelectRegionVars" :key="idxs" @click="selectRegionSelectDataFunc(idxs)" v-bind:class="(idxs === selectRegionSelectDataIdx) ? 'selectRegionSelectDataActive' : 'selectRegionSelectData' ">
            {{indexs.name}}
          </div>
        </div>
      </div>
      <div>
        <div v-for="indexss in dataGroupsSelectRegionVarsDataIdx" :key="indexss">
          <div v-if="indexss === selectRegionSelectDataIdx">
            <chart-views/>
          </div>
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

  cursor:pointer;
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
