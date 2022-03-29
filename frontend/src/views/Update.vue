<template>
  <div id="updatePost">
    <Nav />
    <div>
      <h2>Modify your article</h2>
      <div v-for="(art, idx) in arts" :key="idx">
        <div class="post-form">
          <h2 class="card-title" id="title">{{ art.title }}</h2>
          <div class="separation"></div>
          <p class="card-text price" id="content">{{ art.content }}</p>
          <div>
            <img class="card-img" id="image" alt="imagespost" :src="art.image" v-if="art.image != 0" />
            <img class="card-img" :src="art.image" v-else-if="imgoff" />
          </div>
        </div>
      </div>
      <form class="Post" id="formpost" encType="multipart/form-data">
        <div class="form-group">
          <label for="title">Modify your title:</label> <br />
          <input type="text" class="form-control" v-model="title" id="title" aria-required="true" required />
          <span class="error" v-if="!$v.title.required && $v.title.$dirty">Please input the title of your article. </span>
        </div>
        <div class="form-group">
          <label for="content">Modify your content:</label> <br />
          <textarea class="form-control textarea" row="5" id="content" aria-required="true"></textarea>
          <span class="error" v-if="!$v.content.required && $v.content.$dirty">Please input your content. </span>
        </div>
        <div class="form-group imagebtn">
          <label for="image" class="sr-only" title="image" role="button">Image</label>
          <input type="file" accept=".png, .jpg, .jpeg, .gif, .webp" v-on:change="onSelect" aria-required="true" ref="file" id="image" />
        </div>
        <div class="form-group btn-modify">
          <button type="submit" class="btn signup" @click="updateForm()">Modify</button>
          <button type="submit" class="btn signup" @click="deleteForm()">Delete</button>
        </div>
      </form>

      <Footer />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import { required } from "vuelidate/lib/validators";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "Update",
  components: {
    Nav,
    Footer,
  },
  data() {
    return {
      posts: [],
      title: "",
      file: "",
      content: "",
      userId: "",
      comment: "",
      arts: [],
      comms: [],
      imgoff: 0,
    };
  },
  validations: {
    title: {
      required,
    },
    content: {
      required,
    },
  },
  mounted() {
    this.getOnePost();
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
    onSelect() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },

    updateForm() {
      this.submited = true;
      //this.$v.$touch();
      //if (!this.$v.$invalid) {
      const token = localStorage.getItem("token");
      const userId = VueJwtDecode.decode(localStorage.getItem("token")).userId;
      const title = document.querySelector("#title").value;
      const content = document.querySelector("#content").value;
      const idPost = this.$route.params.id;

      console.log(userId);
      console.log(content);
      console.log(title);
      console.log(idPost);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }

      const formData = new FormData();
      formData.append("image", this.file);
      formData.append("title", title);
      formData.append("content", content);

      console.log(formData); 
      axios
        .put(this.$localhost + "api/post/" + idPost, formData, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            this.$router.push("../Home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      //}
    },
    deleteForm() {
      const token = localStorage.getItem("token");
      const idPost = this.$route.params.id;
      axios
        .delete(this.$localhost + "api/post/" + idPost, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            this.$router.push("../Home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      /*},*/
    },
  },
};
</script>

<style scoped>
#updatePost {
  text-align: center;
}
h2 {
  text-align: center;
  padding: 20px;
  font-size: 18px;
}
.Post {
  width: 40%;
  margin: auto;
}
.post-form {
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

.form-group {
  margin: 15px 0;
}
.btn-modify {
  display: flex;
  justify-content: space-evenly;
}
@media only screen and (max-width: 1024px) {
h2 {
  padding: 0;
}
#formpost {
  width: 100%;
  margin: auto;
}
}
</style>
