<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Signup</router-link> |
      <router-link to="/about">Login</router-link>
    </div> 
<!-- 
    <header id="header">
      <img class="logo" alt="logo" src="../src/assets/logo.png" />
    </header>-->
    <div id="conn-connected"></div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #e55252cb;
    }
  }
}

#conn-connected {
  text-align: center;
  font-size: 24px;
  color: #e55252cb;
}

</style>
