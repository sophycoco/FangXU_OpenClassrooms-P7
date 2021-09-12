<template>
  <div class="home">
    <h1>Welcome to Groupomania</h1>
    <Nav />
    <CreatePost />
    <AllPost />
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
    AllPost,
    Footer,
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 20px;
}
</style>
