<template>
  <div class="Dashboard">
    <form @submit.prevent="createBlog(); newBlog={}">
      <input type="title" name="title" id="title" v-model="newBlog.title" required>
      <textarea name="body" id="body" cols="100" rows="10" v-model="newBlog.body" stuffrequired></textarea>
      <button type="submit">Create Blog</button>
    </form>
    <div class="row">
      <router-link class="blog-list" :to="{name: 'Blog', params: {id: blog.id}}" v-for="blog in blogs" :key="blog.id">{{blog.title}}</router-link>
    </div>
    <div class="row">
      <div class="col-4" v-for="blog in myBlogs">
        <p>{{blog.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        newBlog: {}
      }
    },
    mounted() {
      this.$store.dispatch('getBlogs')
    },
    methods: {
      createBlog() {
        this.newBlog.author = this.user.email
        this.$store.dispatch('createBlog', this.newBlog)
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      blogs() {
        return this.$store.state.blogs
      },
      myBlogs() {
        return this.$store.state.myBlogs
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .blog-list {
    display: block;
  }
</style>