<template>
  <div id="updatePost">
    <Nav />
    <div>
      <h2>Modify your article</h2>
      <form class="Post" id="formpost" encType="multipart/form-data">
        <div class="form-group">
          <label for="title">Title</label> <br />
          <input type="text" class="form-control" v-model="title" id="title" aria-required="true" required />
          <span class="error" v-if="!$v.title.required && $v.title.$dirty">Please input the title of your article</span>
        </div>
        <div class="form-group">
          <label for="content">Content</label> <br />
          <textarea class="form-control textarea" row="5" id="content" aria-required="true"></textarea>
        </div>
        <div class="form-group">
          <label for="image" class="sr-only" title="image" role="button">Image</label>
          <input type="file" accept=".png, .jpg, .jpeg, .gif, .webp" v-on:change="onSelect" aria-required="true" ref="file" id="image" />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-danger signup" @click="updateForm()">Modify</button>
          <button type="submit" class="btn btn-danger signup" @click="deleteForm()">Delete</button>
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
    };
  },
  validations: {
    title: {
      required,
    },
  }, 

  methods: {
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

        console.log(formData);  //error
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
.form-control {
  width: 70%;
  background-color: #14285e96;
  font-family: inherit;
  padding: 10px;
  border: 2px solid var(--input-border);
  border-radius: 4px;
  color: antiquewhite;
  font-style: bold;
}

.form-group {
  margin: 15px 0;
}

</style>
