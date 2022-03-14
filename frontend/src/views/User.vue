<template>
  <div class="Profil">
    <h1>Welcome to Groupomania</h1>
    <Nav />
    <div class="mx-auto">
      <div v-for="(user, idx) in users" :key="idx">
        <div class="card card-product mx-auto">
          <div class="card-body product-body">
            <h2 class="card-title name">{{ user.username }}</h2>
            <div class="separation"></div>
            <div class="forms">
              <div class="form">
                <label for="email">Change my email address</label>
                <input type="email" class="form-control" v-model="email" id="email" required /><br />
                <span class="error" v-if="!$v.email.required && $v.email.$dirty">Please provide a valid email address.</span>
              </div>

              <div class="form">
                <label for="username">Change my username</label>
                <input type="username" class="form-control" v-model="username" id="username" required /><br />
                <span class="error" v-if="!$v.email.required && $v.email.$dirty">Please provide a valid username.</span>
              </div>

              <div class="form">
                <label for="password">Change my password</label>
                <input type="password" class="form-control" v-model="password" id="password" required /><br />
                <span class="error" v-if="!$v.password.required && $v.password.$dirty"
                  >Please choose a password with at least 8 characters, 1 uppercase letter, 1 lowercase letter, and no spaces.</span
                >
                <span class="error" v-if="!$v.password.valid && !$v.password.minLength"
                  >Please choose a password with at least 8 characters, 1 uppercase letter, 1 lowercase letter, and no spaces.</span
                >
              </div>
            </div>
            <button class="btn btn-modify" v-if="userId == user.id || isAdmin == 1" @click="updateUser()">Modify account informations</button><br />
            <button class="btn btn-delete" v-if="userId == user.id || isAdmin == 1" @click="deleteuser()">Delete account</button>
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
import VueJwtDecode from "vue-jwt-decode";

import { required, email, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "user",
  components: {
    Nav,
    Footer,
  },
  data() {
    return {
      users: [],
      userId: "",
      isAdmin: 0,
      username: "",
      email: "",
      password: "",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    username: {
      required,
      email,
    },
    password: {
      required,
      valid: function (value) {
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        return containsUppercase && containsLowercase;
      },
      minLength: minLength(8),
      maxLength: maxLength(20),
    },
  },
  mounted() {
    this.getOneUser();
    this.userId = VueJwtDecode.decode(localStorage.getItem("token")).userId;
    this.admin = VueJwtDecode.decode(localStorage.getItem("token")).isAdmin;
  },
  methods: {
    getOneUser() {
      const token = localStorage.getItem("token");
      const iduser = this.$route.params.id;
      console.log("getOneUser");
      console.log("iduser" + iduser);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }

      axios
        .get(this.$localhost + "api/auth/" + iduser, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          console.log("cannot get informations of the user " + error);
        });
    },
    deleteuser() {
      const token = localStorage.getItem("token");
      const iduser = this.$route.params.id;

      axios
        .delete(this.$localhost + "api/auth/delete/" + iduser, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            localStorage.clear();
            this.$router.push("../Signup");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /*updateUser() {
      this.submited = true;
      console.log("submited");
      /*this.$v.$touch();
      if (!this.$v.$invalid) {
      const token = localStorage.getItem("token");
      const iduser = this.$route.params.id;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const username = document.querySelector("#username").value;

      console.log(token);
      console.log("updateOneUser");
      console.log("iduser" + iduser);

      let users = {
        email: email,
        password: password,
        username: username,
      };
      console.log(users);

      axios
        .put(this.$localhost + "api/auth/" + iduser, users, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            localStorage.setItem("users", JSON.stringify(users));
            this.$router.push("../Home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },*/
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 20px;
}
.card-product {
  align-items: center;
  border-radius: 20px 20px;
  width: 60%;
}
.name {
  color: #e55252cb;
}
.userinfo {
  margin-right: 15px;
}
.error {
  color: #e55252cb;
}
@media (min-width: 320px) and (max-width: 1600px) {
  .card-product {
    margin: 80px auto auto auto;
    flex-direction: column;
    border-radius: 20px 20px;
    width: 80%;
  }
}
</style>
