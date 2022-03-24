<template>
  <div class="navigation">
    <nav class="navbar">
      <!--<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
       <img src="../assets/icon.png" alt="groupomania logo" /> -->
      <div class="navbar-collapse">
        <ul>
          <li class="nav-item">
            <router-link class="nav-link" :to="`/user/${usersid}`">Profile</router-link>
          </li>
          <li class="nav-item" @click="Logout()">
            <!--<button class="nav-link" @click="Logout()">-->Logout
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Home">Home</router-link>
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
.navigation {
  margin:30px 0 100px 0;
}
.navbar-collapse {
  width:40%;
  margin:auto;
}
ul {
  padding: 0;
  display: flex;
  justify-content:space-evenly;
}
.nav-item
 {
  text-decoration: none;
  list-style: none;
  color: #2c3e50;
}
.nav-item:hover, .nav-link:hover {
  background-color: #14285e;
  color:antiquewhite;
  
}
.nav-link
 {
  text-decoration: none;
  list-style: none;
  color: #2c3e50;
}

</style>
