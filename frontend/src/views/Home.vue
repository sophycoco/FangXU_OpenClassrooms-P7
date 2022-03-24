<template>
  <div class="home">
    <h1>WELCOME TO GROUPOMANIA</h1>
    <Nav />
    <CreatePost />
    <AllPosts />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav.vue";
import CreatePost from "@/components/CreatePost.vue";
import AllPosts from "@/components/AllPosts.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Nav,
    CreatePost,
    AllPosts,
    Footer,
  },
};
</script>

<style scoped>
.home {
  margin:50px auto;
}
h1 {
  text-align: center;
  font-size: 20px;
}
</style>
