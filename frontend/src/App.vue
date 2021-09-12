<template>
  <div id="app">
    <header id="header">
      <img class="logo" alt="logo" src="../src/assets/logo.png" />
    </header>
    <div id="conn-connected"></div>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      conn: "",
    };
  },
  created() {
    axios
      .get(this.$localhost + "api/")
      .then((response) => (this.conn = response.data))
      .catch((error) => {
        console.log(error);
        document.getElementById("conn-connected").innerHTML = "The database is not connected. ";
      });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #e55252cb;
}
.logo {
  width: 50%;
  text-align: right;
}
.navigation {
  text-align: center;
}
.btn-primary {
  background-color: #e55252cb;
  font-weight: 600;
}
#conn-connected {
  text-align: center;
  font-size: 24px;
  color: #e55252cb;
}
@media (min-width: 1024px) {
  .logo {
    width: 20%;
  }
}
</style>
