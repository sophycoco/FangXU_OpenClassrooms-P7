<template>
  <div class="Home">
    <h1>Welcome to Groupomania</h1>
    <Nav />
    <div class="onepost">
      <div v-for="(art, idx) in arts" :key="idx">
        <div class="card card-product">
          <div class="card-body product-body">
            <div class="post-form">
              <h2 class="card-title" id="title">{{ art.title }}</h2>
              <div class="separation"></div>
              <p class="card-text price" id="content">{{ art.content }}</p>
              <div>
                <img class="card-img" id="image" alt="imagespost" :src="art.image" v-if="art.image != 0" />
                <img class="card-img" :src="art.image" v-else-if="imgoff" />
              </div>
              <div class="separation"></div>
              <ul>
                <li class="nav-item">
                  <p>
                    Created by <span class="namecreat">{{ art.username }}</span>
                  </p>
                </li>
                <li class="nav-item">
                  <span class=""> {{ datePost(art.dateCreate) }} </span>
                </li>
              </ul>
              <router-link class="btn submit" :to="`/update/${art.id}`" v-if="userId == art.user_id || isAdmin == 1"><button class="btn submit">Modify your article</button></router-link>
            </div>
          </div>
          <div class="container">
            <div class="">
              <div class="">
                <div class="comment">
                  <label for="contentcomm" title="contentcomm">Let me know what you think! </label>
                  <textarea type="text" class="form-control textarea" rows="5" id="contentcomm" v-model="comment" required></textarea><br />
                  <button type="submit" class="btn submit" @click="postComm()">send</button>
                </div>
                <span class="error" v-if="!$v.comment.required && $v.comment.$dirty"> Your comment could not be empty. </span>

                <div class="card idcomm comm" :id="comm.id" v-for="(comm, indx) in comms" :key="indx">
                  <div class="comm-info">
                    <div class="user">
                      <span class="nametitle">{{ comm.username }}</span><br />
                      <span > <small class="font-weight-bold">
                          Commented on
                        </small></span>
                          <span><small class=""> {{ datePost(comm.dateCreate) }} </small></span>
                    </div>
                  </div>
                  <div class="comm-content">
                    <div class="user align-items-center">
                      <span
                        ><small class="font-weight-bold">{{ comm.content }}</small></span
                      >
                    </div>
                  </div>
                  <div class="comm-delete">
                    <button class="btn reply smallsize" type="submit" v-if="userId == comm.user_id || isAdmin == 1" @click="deletecomm()">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="separation"></div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import { required } from "vuelidate/lib/validators";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "OnePost",
  components: {
    Nav,
    Footer,
  },
  data() {
    return {
      comment: "",
      arts: [],
      comms: [],
      imgoff: 0,
      userId: VueJwtDecode.decode(localStorage.getItem("token")).userId,
      isAdmin: VueJwtDecode.decode(localStorage.getItem("token")).isAdmin,
    };
  },
  validations: {
    comment: {
      required,
    },
  },
  mounted() {
    this.getOnePost();
    this.getAllComments();
  },
  methods: {
    getOnePost() {
      const token = localStorage.getItem("token");
      const idPost = this.$route.params.id;

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }

      axios
        .get(this.$localhost + "api/post/" + idPost, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.arts = res.data;
        })
        .catch((error) => {
          console.log("Le post n'a pas pu être récupéré /" + error);
        });
    },

    postComm() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const token = localStorage.getItem("token");
        const userId = VueJwtDecode.decode(localStorage.getItem("token")).userId;
        const idPost = this.$route.params.id;

        const formcomm = {
          user_id: userId,
          content: this.comment,
          post_id: idPost,
        };

        console.log(formcomm);
        axios
          .post(this.$localhost + "api/comm", formcomm, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + token,
            },
          })
          .then((res) => {
            if (res) {
              location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    getAllComments() {
      const token = localStorage.getItem("token");
      const idPost = this.$route.params.id;

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }

      axios
        .get(this.$localhost + "api/comm/" + idPost, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          this.comms = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deletecomm() {
      const token = localStorage.getItem("token");
      const div1 = document.querySelector(".idcomm");
      const comment_id = div1.getAttribute("id");

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }

      axios
        .delete(this.$localhost + "api/comm/" + comment_id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            location.reload();
          }
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
.card-product {
  border-radius: 20px 20px;
  width: 70%;
  margin: 25px auto 25px auto;
  box-shadow: 0 5px 15px 0 #14285e96;
  padding: 25px;
}
.card-img {
  object-fit: fill;
  max-width: 100%;
  height: auto;
}
.post-form {
  padding: 0 0 25px 0;
}
.container {
  width: 40%;
  margin: auto;
}
ul {
  padding: 0;
}
.nav-item {
  text-decoration: none;
  list-style: none;
}
.container {
  padding: 15px 0 20px 0;
}
.form-control {
  width: 100%;
  background-color: #14285e96;
  font-family: inherit;
  border: 2px solid var(--input-border);
  border-radius: 4px;
  color: antiquewhite;
  font-style: bold;
}
.comment {
  margin-bottom: 30px;
}
h1 {
  text-align: center;
  font-size: 20px;
}
.nametitle {
  font-size: 16px;
  color: #8e1801e9;
}
.namecreat {
  color: #8e1801e9;
}
.btn {
  color: whitesmoke;
  background-color: #ff5050e5;
  border: none;
  border: 2px solid var(--input-border);
  border-radius: 4px;
  padding: 3px 10px;
}
.idcomm {
  background-color: #ccacac;
  width: 100%;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 5px 15px 0 #926d6d;
  padding: 15px 0;
}
.smallsize {
  font-size: 12px;
  font-style: italic;
  border: none !important;
}
.textarea {
  width: 95%;
}
.comm-content {
  font-size: 18px;
}

.error {
  color: #e55252cb;
}

@media only screen and (max-width: 1024px) {
  .card-product {
    margin: 90px auto auto auto;
    flex-direction: column;
    border-radius: 20px 20px;
    width: 80%;
  }
  .card-img {
    width: 100%;
    object-fit: contain;
  }
  .container {
    width: 80%;
    margin: auto;
  }
}
</style>
