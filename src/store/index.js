import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../utils/firebaseInit'


vue.use(vuex)

export default new vuex.Store({
    state: {
        user: {}
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        register({ commit, dispatch }, newUser) {
            firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then(res => {
                commit('setUser', res)
                router.push({ name: 'Dashboard' })
            }).catch(err => {
                console.error(err)
            })
        },
        login({ commit, dispatch }, creds) {
            firebase.auth().signInWithEmailAndPassword(creds.email, creds.password).then(res => {
                commit('setUser', res.user)
                router.push({ name: 'Dashboard' })
            }).catch(err => {
                console.error(err)
            })
        },
        authenticate({ commit, dispatch }) {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    commit('setUser', user)
                    router.push({ name: 'Dashboard' })
                } else {
                    commit('setUser', {})
                    router.push({ name: 'Login' })
                }
            })
        },
        logout({ commit, dispatch }) {
            firebase.auth().signOut().then(res => {
                commit('setUser', {})
                router.push({ name: 'Login' })
            }).catch(err => {
                console.error(err)
            })
        }
    }
})