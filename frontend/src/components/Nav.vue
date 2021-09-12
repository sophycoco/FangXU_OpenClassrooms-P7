<template>
  <div class="navigation">
    <nav class="navbar navbar-expand-md navbar-light d-flex justify-content-between">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <img src="../assets/icon.png" alt="groupomania logo" />
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 nav-menu">
          <li class="nav-item active">
            <router-link class="nav-link" :to="`/user/${usersid}`">Profile</router-link>
          </li>
          <li class="nav-item">
            <button class="nav-link" @click="Logout()">Logout</button>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/Home">News feed</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "Nav",
  data() {
    return {
      usersid: VueJwtDecode.decode(localStorage.getItem("token")).userId,
    };
  },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
img {
  width: 10%;
}
@media (min-width: 768px) {
  img {
    width: 5%;
  }
}
button {
  border: none !important;
  background-color: #fff !important;
}
</style>
