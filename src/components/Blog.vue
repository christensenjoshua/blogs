<template>
    <div class="Blog">
        <router-link :to="{name: 'Dashboard'}">Dashboard</router-link>
        <h1>{{blog.title}}</h1>
        <h5 v-if="blog.author">Written by {{blog.author}}</h5>
        <p>{{blog.body}}</p>
    </div>
</template>


<script>
    export default {
        name: 'Blog',
        data() {
            return {}
        },
        mounted() {
            this.$store.dispatch('getBlog', this.$route.params.id)
        },
        computed: {
            blog() {
                return this.$store.state.activeBlog
            }
        },
        methods: {},
        components: {}
    }
</script>


<style scoped>
</style>