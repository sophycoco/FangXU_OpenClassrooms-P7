<template>
  <div class="Home">
    <h1>Welcome to Groupomania</h1>
    <Nav />
    <div class="mx-auto">
      <div v-for="(art, idx) in arts" :key="idx">
        <div class="card card-product mx-auto">
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
              <ul class="navbar-nav">
                <li class="nav-item">
                  <p>
                    Created by <span class="namecreat">{{ art.username }}</span>
                  </p>
                </li>
                <li class="nav-item">
                  <span class=""> {{ datePost(art.dateCreate) }} </span>
                </li>
              </ul>
              <router-link class="btn submit" to="/update/:id" v-if="userId == art.user_id || isAdmin == 1"><button class="btn submit"> Modify your article </button></router-link>
              <!--<button class="btn submit" @click="updatePost()"> Modify your article </button>      "`/post/${art.id}`"  --> 
            </div>
          </div>
          <div class="container mb-5">
            <div class="justify-content-center">
              <div class="">
                <div class="headings justify-content-between align-items-center">
                  <label for="contentcomm" title="contentcomm" class="sr-only">Comment</label>
                  <input type="text" class="form-control textarea" rows="2" id="contentcomm" v-model="comment" required />
                  <button type="submit" class="btn submit" @click="postComm()">Comment</button>
                </div>
                <span class="error" v-if="!$v.comment.required && $v.comment.$dirty"> Your comment could not be empty. </span>

                <div class="card idcomm" :id="comm.id" v-for="(comm, indx) in comms" :key="indx">
                  <div class="justify-content-between align-items-center">
                    <div class="user align-items-center">
                      <span
                        ><small class="font-weight-bold"
                          ><span class="nametitle">{{ comm.username }} </span>
                          Commented
                        </small></span
                      >
                    </div>
                  </div>
                  <div class="justify-content-between align-items-center contentcommentaire">
                    <div class="user align-items-center">
                      <span
                        ><small class="font-weight-bold">{{ comm.content }}</small></span
                      >
                    </div>
                  </div>
                  <div class="action justify-content-between align-items-center">
                    <button class="reply smallsize" type="submit" v-if="userId == comm.user_id || isAdmin == 1" @click="deletecomm()">Delete</button>
                    <!--<div class="icons align-items-center" v-if="userId == comm.user_id || isAdmin == 1">
                      <i class="fas fa-globe"></i>
                      <i class="fa fa-check-circle-o check-icon"></i> 
                    </div>-->
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

    /*updatePost() {
      this.submited = true;
      console.log("submited");
      this.$v.$touch();
      /*if (!this.$v.$invalid) { 
      const token = localStorage.getItem("token");
      /*const userId = VueJwtDecode.decode(localStorage.getItem("token")).userId;

      const idPost = this.$route.params.id;
      const title = document.querySelector("#title").value;

      console.log(title);
      const content = document.querySelector("#content").value;
      const image = document.querySelector("#image").value;

      console.log(token);
      console.log("updatePost");
      console.log("idPost" + idPost);

      let posts = {
        title: title,
        content: content,
        image: image,
      };
      console.log(posts);

      axios
        .put(this.$localhost + "api/post/" + idPost, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            localStorage.setItem("posts", JSON.stringify(posts));
            this.$router.push("../Home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },*/

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
      /*const idPost = this.$route.params.id;*/

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }

      axios
        .get(this.$localhost + "api/comm/" /*+ idPost*/, {
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
  display: flex;
  width: 100%;
  width: 50%;
}
.card-img {
  width: 100%;
  object-fit: contain;
}
.nav-item {
  margin-right: 15px;
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
.smallsize {
  font-size: 14px;
  font-style: italic;
  border: none !important;
}
.contentcommentaire {
  font-size: 18px;
}
.error {
  color: #e55252cb;
}

@media (min-width: 320px) and (max-width: 1024px) {
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
}
</style>
