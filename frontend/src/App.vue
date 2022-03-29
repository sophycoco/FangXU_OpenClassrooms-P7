<template>
  <div id="app">
    <header id="header">
      <img class="logo" alt="logo-main" src="../src/assets/icon-logo-white.png" />
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
      .get(this.$localhost + "api/auth/login")
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
  max-width: 1600px;
  margin: auto;
  background-color: #14285e60;
}

#header {
  background-color: #14285e;
}

.logo {
  width: 60%;
}
.form-control {
  width: 50%;
  background-color: #14285e96;
  font-family: inherit;
  padding: 10px;
  border: 2px solid var(--input-border);
  border-radius: 4px;
  color: antiquewhite;
  font-style: bold;
}
.form {
  margin: 10px 0 20px 0;
}
.btn{
  color: whitesmoke;
  background-color: #ff5050e5;
  border: none;
  border: 2px solid var(--input-border);
  border-radius: 4px;
  padding: 3px 10px;
}
.error {
  color: #970000;
  font-size: 20px;
  font-style:bold;
}

/*#nav {
  padding: 30px 0 100px 0;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #e55252cb;
}
.logo {
  width: 60%;
  text-align: right;
}
.navigation {
  text-align: center;
}
.navbar-collapse {
  text-align: center;
}
.btn-primary {
  background-color: #e55252cb;
  font-weight: 600;
}*/
#conn-connected {
  text-align: center;
  font-size: 24px;
  color: #e55252cb;
}
@media only screen and (max-width: 1024px) {
  .logo {
    width: 70%;
  }
}
</style>
