<template>
  <div class="allposts">
    <div :id="art.id" v-for="(art,idx) in arts" :key="idx">
      <div class="card card-product">
        <div class="card-body product-body">
          <h2 class="card-title">{{ art.title }}</h2>
          <div class="separation"></div>
          <p class="card-text">{{ art.content}}</p>
          <div>
            <img class="card-img" :alt="art.id" :src="art.image" v-if="art.image != 0" />
          </div>
          <div class="separation"></div>
          <ul class="navbar-nav">
            <li class="nav-item">
              <p>Created by <span class="namecreat"> {{art.username}}</span> </p>
            </li>
            <li class="nav-item">
              <span class=""> {{ datePost(art.dateCreate)}} </span>
            </li>
          </ul>
          <router-link class="btn text-center" :to="`/post/${art.id}`">See more ...</router-link>
        </div>
      </div>
      <div class="separation"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "AllPost",
  data() {
    return {
      arts: [],
      imgoff: 0,
      usersid: VueJwtDecode.decode(localStorage.getItem("token")).userId,
      isAdmin: VueJwtDecode.decode(localStorage.getItem("token")).isAdmin,
    };
  },
  mounted() {
    this.getAllPost();
  },
  methods: {
    async getAllPost() {
      const token = localStorage.getItem("token");

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }

      axios
        .get(this.$localhost + "api/post/", {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          this.arts = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    datePost(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-Fr", options);
    },
  },
};
</script>

<style scoped>
.allposts{
  margin: 25px auto auto auto;
  background-color: #ccacac;
  box-shadow: 0 5px 15px 0 #926d6d;
  padding: 15px 0 20px 0;
}
.card-product {
  display: flex;
  align-self:center;
  border-radius: 20px 20px;
  width:70%;
  margin: 25px auto 25px auto;
  box-shadow: 0 5px 15px 0 #926d6d;
  padding: 25px;
}

.card-body {
  margin: auto;
}
ul {
  padding:0;
}
.card-img {
  object-fit:fill;
  max-width: 100%;
  height: auto;
}
.nav-item {
  text-decoration: none;
  list-style: none;
}
.namecreat {
  color: whitesmoke;
  font-style: strong;
}
@media (min-width: 320px) and (max-width: 1000px) {
  .card-product {
    margin: 90px auto auto auto;
    flex-direction: column;
    border-radius: 20px 20px;
    width: 80%;
  }
  .card-img {
    object-fit: contain;
  }
}
</style>