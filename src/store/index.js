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
      communitiesInfo: {}
  },
  actions: {
    GET_Map : async ({commit}) => {
      await axios(getMap)
          .then(response => response.data)
          .then(res => {
            commit('getMap', res)
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
  },
  mutations: {
    getMap: (state, res) => {
      state.datas = res.data.oblasti
    },
    getGromad: (state, data) => {
        return state.communitiesInfo = data
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
    }
  }
})
