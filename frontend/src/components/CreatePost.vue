<template>
  <main id="Post">
    <div>
      <form class="Post" id="formpost" encType="multipart/form-data">
        <div class="form">
          <label for="title">What's on your mind?</label><br />
          <input type="text" class="form-control" id="title" v-model="title" aria-required="true" required /><br>
          <span class="error" v-if="(!$v.title.required && $v.title.$dirty)">Please enter a title.</span>
        </div>
        <div class="form">
          <label for="content">Tell us something more!</label><br />
          <textarea class="form-control textarea " v-model="content" rows="10" id="content" aria-required="true" required></textarea>
        </div>
        <div class="form">
          <label class="sr-only" for="image" title="image" role="button">Image</label>
          <input type="file" accept=".png, .jpg, .jpeg, .gif, .webp" v-on:change="onSelect" ref="file" aria-required="true" id="image" />
        </div>
        <span class="error" v-if="(!$v.content.required && $v.content.$dirty)">Please add an article and an image. </span><br><br>
        <span id="notfound" class="error"> </span>
        <button type="submit" class="btn submit" @click="postform()">Submit</button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "CreatePost",
  data() {
    return {
      title: "",
      file: "",
      content: "",
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
  methods: {
    onSelect() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },

    postform() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const token = localStorage.getItem("token");
        const userId = VueJwtDecode.decode(localStorage.getItem("token")).userId;
        const title = document.querySelector("#title").value;
        const content = document.querySelector("#content").value;

        const formData = new FormData();
        formData.append("image", this.file);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("user_id", userId);

        console.log(formData);

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          axios.defaults.headers.common["Authorization"] = null;
          this.$router.push("/");
        }

        axios
          .post(this.$localhost + "api/post", formData, {
            headers: {
              Authorization: "bearer " + token,
            },
          })
          .then((res) => {
            if (res) {
              window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
            document.getElementById("notfound").innerHTML =
              "An error has occured, please try later.";
          });
      }
    },
  },
};
</script>

<style scoped>
.form {
  margin: 15px
}
.form-control {
  width: 100%;
  background-color: #14285e96;
  font-family: inherit;
  padding: 10px;
  border: 2px solid var(--input-border);
  border-radius: 4px;
  color: antiquewhite;
  font-style: bold;
}
#formpost {
  text-align: center;
  margin: auto;
  width: 40%;
}

.error {
  color: #e55252cb;
}
</style>