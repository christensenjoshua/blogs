import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../utils/firebaseInit'


vue.use(vuex)

export default new vuex.Store({
    state: {
        user: {},
        blogs: [],
        activeBlog: {},
        myBlogs: []
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setBlogs(state, payload) {
            state.blogs = payload
        },
        setMyBlogs(state, payload) {
            state.myBlogs = payload
        },
        setActiveBlog(state, payload) {
            state.activeBlog = payload
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
                    dispatch('getMyBlogs')
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
        },
        getBlogs({ commit, dispatch }) {
            db.collection('blogs').get().then(querySnapshot => {
                let blogs = []
                querySnapshot.forEach(doc => {
                    if (doc.exists) {
                        let blog = doc.data()
                        blog.id = doc.id
                        blogs.push(blog)
                    }
                })
                commit('setBlogs', blogs)
            })
        },
        getMyBlogs({ state, commit, dispatch }) {
            db.collection('blogs').where('author', '==', state.user.email).get().then(querySnapshot => {
                let blogs = []
                querySnapshot.forEach(doc => {
                    if (doc.exists) {
                        let blog = doc.data()
                        blog.id = doc.id
                        blogs.push(blog)
                    }
                })
                commit('setMyBlogs', blogs)
            })
        },
        getBlog({ commit, dispatch }, id) {
            db.collection('blogs').doc(id).get().then(doc => {
                let blog = doc.data()
                blog.id = doc.id
                commit('setActiveBlog', blog)
            }).catch(err => {
                console.error(err)
            })
        },
        createBlog({ commit, dispatch }, newBlog) {
            db.collection('blogs').add(newBlog).then(doc => {
                console.log('Created Blog with ID ' + doc.id)
                dispatch('getBlogs')
            })
        }
    }
})