<template v-if="this.dataValue">
  <div>
    <div>
      <bread-rumbs v-bind:breadCrumbsDate="this.breadCrumbsDate"/>
    </div>
    <div>
      <back-next v-bind:backNextData="this.backNextData"/>
    </div>
    <div style="display:flex">
      <div class="selectData">
        <div style="display:flex">
          <!--        Выбор Груп показателей-->
          <div>
            <div v-for="(index, idx) in this.dataGroups" :key="idx">
              <div @click="selectRegionFunc(idx)" v-bind:class="(idx === selectRegionIdx) ? 'selectRegionDataActive' : 'selectRegionData' " class="selectRegionDataStyle">
                {{index.name = index.name[0].toUpperCase() + index.name.substring(1).toLowerCase()}}
              </div>
            </div>
          </div>
          <!--        Выбор Показателей-->
          <div style="margin-top:-5px;">
            <div v-for="(indexs, idxs) in dataGroupsSelectRegionVars" :key="idxs" @click="selectRegionSelectDataFunc(idxs)" v-bind:class="(idxs === selectRegionSelectDataIdx) ? 'selectRegionSelectDataActive' : 'selectRegionSelectData' " class="selectRegionDataSelect">
              {{indexs.name}}
            </div>
          </div>
        </div>
        <div>
          <div>
<!--            области укр-->
            <div class="flex-select">
              <div>
                <div v-if="'oblasti' !== this.typeOblast">
                  <p>Області України:<span>24</span></p>
                </div>
                <div v-if="'oblasti' === this.typeOblast" style="border-bottom:#333333 2px solid;">
                  <p>Області України:<span>24</span></p>
                </div>
              </div>
              <div>
                <p>Громади України:<span>1469</span></p>
              </div>
              <div>
                <p>Громади по областям</p>
              </div>
            </div>
<!--            селект года-->
            <div>
              <div style="width:206px; margin-top:34px; margin-left:16px">
                <select class="selectYe">
                  <option>Рік показників</option>
                  <option @click="selectYear('2021')" v-show="this.year !== '2021'">2021</option>
                </select>
              </div>
              <div>
                <p v-show="this.year">{{this.year}}</p>
              </div>
            </div>
<!--            сортиорвка по-->
            <div style="display:flex; margin-top:34px;">
              <div style="width:206px;margin-left:42px">
                <p>Сортувати за:</p>
              </div>
              <div class="selectSort">
                <p v-bind:class="{'activeSelectSort': (this.sortDataChart === 'ab')}" @click="activeSelectSortFunc('ab')">Алфавітом</p>
                <p v-bind:class="{'activeSelectSort': (this.sortDataChart === 'chisel')}" @click="activeSelectSortFunc('chisel')">Показниками</p>
              </div>
              <div class="sortAndTopToButtom" v-bind:class="{'activeSelectSort': (this.sortDataLowToHide === 'top')}" @click="sortAndTopToButtomFunc('top')">
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.0908 21L14.0908 6" stroke="#828282" stroke-linecap="round"/>
                  <path d="M14.0908 6L18.1817 10.0909" stroke="#828282" stroke-linecap="round"/>
                  <path d="M14.0909 6L10 10.0909" stroke="#828282" stroke-linecap="round"/>
                  <path d="M22.875 26H4.125C2.39911 26 1 24.6009 1 22.875V4.125C1 2.39911 2.39911 1 4.125 1H22.875C24.6009 1 26 2.39911 26 4.125V22.875C26 24.6009 24.6009 26 22.875 26Z" stroke="#828282" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="sortAndTopToButtom" v-bind:class="{'activeSelectSort': (this.sortDataLowToHide === 'bottom')}" @click="sortAndTopToButtomFunc('bottom')">
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.0908 6L14.0908 21" stroke="#828282" stroke-linecap="round"/>
                  <path d="M14.0908 21L18.1817 16.9091" stroke="#828282" stroke-linecap="round"/>
                  <path d="M14.0909 21L10 16.9091" stroke="#828282" stroke-linecap="round"/>
                  <path d="M22.875 1H4.125C2.39911 1 1 2.39911 1 4.125V22.875C1 24.6009 2.39911 26 4.125 26H22.875C24.6009 26 26 24.6009 26 22.875V4.125C26 2.39911 24.6009 1 22.875 1Z" stroke="#828282" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
<!--          График-->
          <div v-for="indexss in dataGroupsSelectRegionVarsDataIdx" :key="indexss">
            <div v-if="indexss === selectRegionSelectDataIdx">
              <GChart style="height:500px; width:600px" type="BarChart" :data="chartDataData"/>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breadRumbs from "@/views/componentView/breadRumbs";
import BackNext from "@/views/componentView/backNext";
import { GChart } from 'vue-google-charts'
import {mapActions, mapGetters} from "vuex";

export default {
  name: "regionPosition",
  components: {breadRumbs, BackNext, GChart},
  data() {
    return {
      a: this.$route.path.split('/'),
      selectRegion: 'ДЕМОГРАФІЯ',
      selectRegionIdx: 'ДЕМОГРАФІЯ',
      selectRegionSelectData: 'Iж',
      selectRegionSelectDataIdx: 'Iж',
      dataCharts: {},
      chartRender: true,
      VectorSvg: './src/assets/img/svg/Vector.svg',
      oblastData: [''],
      gromadData: [''],
      gromadFromOdlastData: [''],
      year: '',
      sortDataChart: 'ab',
      sortDataLowToHide: 'top',
      typeOblast: 'oblasti'
    }
  },
  computed: {
    ...mapGetters(['getDatasGromad','gromadPosicion']),

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
    backNextData () {
      return '/' + this.a[1] + '/' + this.a[2] + '/' + this.a[3]
    },
    breadCrumbsDate () {
      return '/' + this.a[1]
    },
    chartData () {
      return this.gromadPosicion['list'].map((element) => {
        return [element.name.toString(), element.value]
      } )
    },
    chartDataData () {
      return [['Year', '']].concat(this.chartData)
    }
  },
  methods: {
    ...mapActions(['GET_Gromad', 'GET_GromadPosicion']),
    selectRegionFunc: function selectRegionFunc(idx){
      if (this.selectRegionIdx === idx){
        this.selectRegionSelectDataIdx = ''
        this.selectRegionIdx = idx
      }
      else{
        this.selectRegionIdx = idx
      }
      this.GET_GromadPosicion([this.typeOblast, '2021', this.selectRegionSelectDataIdx, 'Житомирська,Кіровоградська'])
    },
    selectRegionSelectDataFunc: function selectRegionSelectDataFunc(idxs){
      this.selectRegionSelectDataIdx = idxs
      this.GET_GromadPosicion([this.typeOblast, '2021', this.selectRegionSelectDataIdx, 'Житомирська,Кіровоградська'])
    },
    selectYear: function selectYear(data){
      this.year = data
    },
    activeSelectSortFunc: function activeSelectSortFunc(data){
      this.sortDataChart = data
    },
    sortAndTopToButtomFunc: function sortAndTopToButtomFunc(data){
      this.sortDataLowToHide = data
    }
  },
  async created() {
    await this.GET_GromadPosicion([this.typeOblast, '2021', this.selectRegionSelectDataIdx, 'Житомирська,Кіровоградська'])
    await this.GET_GromadPosicion([this.typeOblast, '2021', this.selectRegionSelectDataIdx, 'Житомирська,Кіровоградська'])
    await this.GET_Gromad(this.a)
  },
  async mounted(){
    await this.GET_GromadPosicion([this.typeOblast, '2021', this.selectRegionSelectDataIdx, 'Житомирська,Кіровоградська'])
    await this.GET_GromadPosicion([this.typeOblast, '2021', this.selectRegionSelectDataIdx, 'Житомирська,Кіровоградська'])
    await this.GET_Gromad(this.a)
  }
}
</script>

<style scoped>
.selectData{
  display:flex;
  margin-left:5vw;
  margin-top:8vh;
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
  content:'ᐳ';
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
.flex-select{
  display:flex;
  flex-direction:row;
}
.flex-select > div{
  width:200px;
  display: flex;
  align-items: center;
  align-self: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  justify-self: center;
  color:#333333;
  cursor:pointer;
}
span{
  color: #3532DD;
}
.selectSort{
  display:flex;
}
.selectSort > p{
  display:flex;
  align-self:center;
  align-items:center;
  align-content:center;
  justify-content:center;
  justify-items:center;
  justify-self:center;
  color:#333333;
  width:120px;
  margin-top:-8px;
  margin-right:24px;
  cursor:pointer;
  padding:8px;
  border-radius:7px;
}
.selectYe{
  width:166px;
  height: 32px;
  border: 1px solid #A0A0A0;
  border-radius: 7px;
  background-color:#fff;
  color:#333333;
  padding-left:8px;
  padding-right:8px;
  cursor:pointer;
}
.sortAndTopToButtom{
  margin-top:-5px;
  margin-left:18px;
  cursor:pointer;
  height:27px;
  border-radius:7px;
}
.activeSelectSort{
  background-color:#FFE24C;
}
</style>
