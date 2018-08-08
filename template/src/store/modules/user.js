import {  getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      setToken(token);
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 获取用户信息
    personalInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // personalInfo(state.token).then(response => {
        //   if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
        //     reject('error')
        //   }
        //   if(response.status==2000){
        //     commit('SET_NAME', response.data.name)
        //   }
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
        commit('SET_NAME', 'test')
        resolve({data:{name:'test'},status:2000});
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        // getUserInfo(role).then(response => {
        //   const data = response.data
        //   commit('SET_ROLES', data.roles)
        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   commit('SET_INTRODUCTION', data.introduction)
        //   resolve()
        // })
      })
    }
  }
}

export default user
