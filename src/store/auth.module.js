import axios from "axios";
import store from './index'
import {createLogger} from "vuex";

export default {
    namespaced: true,
    state(){
        return {
            authMessage: '',
            regMessage: '',
            passMessage: '',
            user:{},
            token: localStorage.getItem('TOKEN'),
            beer: false
        }
    },
    mutations:{
        logout(state){
            state.token = ''
            state.user = {}
            localStorage.removeItem('TOKEN')
        },
        setToken(state, token){
            state.token = token
            localStorage.setItem('TOKEN', token)
        },
        setAuthMessage(state, message){
            state.authMessage = message
        },
        clearAuthMessage(state){
            state.authMessage = ''
        },
        setPassMessage(state, message){
            state.passMessage = message
        },
        clearPassMessage(state){
            state.passMessage = ''
        },
        setRegMessage(state, message){
            state.regMessage = message
        },
        clearRegMessage(state){
            state.regMessage = ''
        },
        setInfo(state, info){
            state.user = info
        },
        addSpace(state, size){
            state.user.usedSpace += size
        },
        deleteSpace(state, size){
            state.user.usedSpace -= size
        },
        changeBeer(state, beer){
            state.beer = beer
        },
        restorePass(state, type){
            state.user.restorePass = type
        }
    },
    actions:{
        setBeer({commit}){
            commit('changeBeer', true)
            setTimeout(()=>{
                commit('changeBeer', false)
            }, 3000)
        },
        setAuthMessage({commit}, message){
            commit('setAuthMessage', message)
            setTimeout(()=>{
                commit('clearAuthMessage')
            }, 5000)
        },
        setRegMessage({commit}, message){
            commit('setRegMessage', message)
            setTimeout(()=>{
                commit('clearRegMessage')
            }, 5000)
        },
        setPassMessage({commit}, message){
            commit('setPassMessage', message)
            setTimeout(()=>{
                commit('clearPassMessage')
            }, 5000)
        },
        async register({dispatch}, payload){
            try {
                const url = 'http://localhost:8080/api/auth/registration'
                const res = await axios.post(url, payload)
                dispatch('setRegMessage', res.data.message)
            }catch (e) {
                dispatch('setRegMessage', e.response.data.message)
            }
        },
        async login({commit, dispatch}, payload){
            try {
                const url = 'http://localhost:8080/api/auth/login'
                const res = await axios.post(url, payload)
                commit('setToken', res.data.token)
                commit('setInfo', res.data.user)
                return res
            }catch (e) {
                dispatch('setAuthMessage', e.response.data.message)
            }
        },
        async auth({commit, dispatch, getters}){
            try {
                const url = 'http://localhost:8080/api/auth/auth'

                const res = await axios.get(url, getters.authHeader)
                commit('setToken', res.data.token)
                commit('setInfo', res.data.user)
                return res
            }catch (e) {
                commit('logout')
            }
        },
        async updateUserInfo({dispatch, getters}, payload){
            try {
                const url = `http://localhost:8080/api/auth`
                const res = await axios.patch(url, payload, getters.authHeader)
                dispatch('file/setFileMessage',{
                    text: res.data.message,
                    color: 'primary',
                    timeout: 2000
                }, {root:true})
            }catch (e) {
                dispatch('setAuthMessage', e.response.data.message)
                return e.response.data.message
            }
        },
        async changePassword({commit, dispatch, getters}, payload){
            try {
                const url = `http://localhost:8080/api/auth/password`
                const res = await axios.patch(url, payload, getters.authHeader)
                dispatch('file/setFileMessage',{
                    text: res.data.message,
                    color: 'primary',
                    timeout: 2000
                }, {root:true})
            }catch (e) {
                dispatch('setAuthMessage', e.response.data.message)
                return e.response.data.message
            }
        },
        async restorePassword({commit, dispatch}, payload){
            try {
                const url = `http://localhost:8080/api/auth/restorePass`
                const res = await axios.post(url, payload)
                dispatch('setPassMessage', res.data.message)
            }catch (e) {
                dispatch('setPassMessage', e.response.data.message)
                return e.response.data.message
            }
        },
        async newPass({commit, dispatch, getters}, payload){
            try{
                const url = `http://localhost:8080/api/auth/newPass`
                const res = await axios.post(url, payload, getters.authHeader)
                commit('restorePass', false)
                dispatch('file/setFileMessage',{
                    text: res.data.message,
                    color: 'primary',
                    timeout: 2000
                }, {root:true})
            }catch (e) {
                dispatch('setPassMessage', e.response.data.message)
                return e.response.data.message
            }
        }
    },
    getters:{
        token(state){
            return state.token
        },
        user(state){
            return state.user
        },
        isAuth(_, getters){
            return getters.token ? true : false
        },
        initials(state){
            return state.user.name[0] + state.user.surname[0]
        },
        authHeader(state){
            return {headers: {Authorization: `Bearer ${state.token}`}}
        },
        beer(state){
            return state.beer
        }
    }
}