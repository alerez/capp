import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const url = 'https://sarr.rshmelev.workers.dev'

const getMap = {
  method: 'get',
  url: url + '/map',
  headers: {
    'Content-Type': 'application/json'
  },
};

export default new Vuex.Store({
  state: {
      datas: {},
      communitiesInfo: {},
      gromPosicion: {},
      chartData: {},
      mapGromadName: {}
  },
  actions: {
    GET_Map : async ({commit}) => {
      await axios(getMap)
          .then(response => response.data)
          .then(res => {
            commit('getMap', res)
            commit('getMapGromadName', res)
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    GET_Gromad : async ({commit}, data) => {
      await axios
          .get(url + '/gromada?' + 'oblastId=' + data[1] + '&regionId=' + data[2] +'&id=' + data[3],
              {headers: {'Content-Type': 'application/json'}})
          .then(response => response.data)
          .then(res => {
              commit('getGromad', res.data)
          })
          .catch(function (error) {
              commit('getGromad', '')
              console.log(error);
          });
    },
      GET_GromadPosicion : async ({commit}, data) => {
          await axios
              .get(url + '/compare?' + 'kind=' + data[0] + '&year=' + data[1] +'&var=' + data[2] +'&oblasti=' + data[3],
                  {headers: {'Content-Type': 'application/json'}})
              .then(response => response.data)
              .then(res => {
                  commit('gromadPosicion', res.data)
              })
              .catch(function (error) {
                  commit('gromadPosicion', '')
                  console.log(error);
              });
      },
    UPPDATE_CHART: async ({commit}, data) => {
        await commit('uppdateChart', data)
    }
  },
  mutations: {
    getMap: (state, res) => {
      state.datas = res.data.oblasti
    },
    getMapGromadName: (state, res) => {
        state.mapGromadName = res.data.oblasti.map(a => a.id)
    },
    getGromad: (state, data) => {
        state.communitiesInfo = data
    },
    gromadPosicion: (state, data) => {
        state.gromPosicion = data
    },
    uppdateChart: (state, data) => {
        state.chartData = data
    }
  },
  modules: {

  },
  getters: {
    getNameOblasti: state => {
      return state.datas
    },

    getDatasGromad: state =>  {
        return state.communitiesInfo
    },
    gromadPosicion: state =>  {
        return state.gromPosicion
    },
    getDataCharts: state => {
        return state.chartData
    },
    getMapGromadNameData: state => {
        return state.mapGromadName
    }
  }
})
