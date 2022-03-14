<template>
  <main id="app">
    <h1>Welcome to Groupomania</h1>
    <form class="signup">
      <div class="form">
        <label for="email">Email address</label>
        <input type="email" class="form-control" v-model="email" id="email" aria-required="true" required /><br>
        <span class="error" v-if="(!$v.email.required && $v.email.$dirty)">Please provide a valid email address.</span>
      </div>
      <div class="form">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username" v-model="username" name="username" aria-required="true" required /><br>
        <span class="error" v-if="(!$v.username.required && $v.username.$dirty)">Please choose your username. </span>
      </div>
      <div class="form">
        <label for="password">Password</label>
        <input type="password" class="form-control" v-model="password" id="password" aria-required="true" required /><br>
        <span class="error" v-if="(!$v.password.required && $v.password.$dirty )">Please choose a password with at least 8 characters, 1 uppercase letter, 1 lowercase letter, and no spaces.</span>
        <span class="error" v-if="(!$v.password.valid && !$v.password.minLength )">Please choose a password with at least 8 characters, 1 uppercase letter, 1 lowercase letter, and no spaces.</span>
      </div>
      <button type="submit" class="btn signup" @click="createUser()">
        Submit
      </button><br>
      <span id="notfound" class="error">If you are already a member, please login directly.</span>
    </form>
    <div class="separation"></div>
    <p class="encouragement">
      Already a member ? Please login !
    </p>
    <router-link class="btn login" to="/"><button>Login</button></router-link>
    <Footer />
  </main>
</template>

<script>
import Footer from "@/components/Footer.vue";
import axios from "axios";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "Signup",
  components: {
    Footer,
  },
  data() {
    return {
      email: "",
      username: "",
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
  methods: {
    /**
     * Permet de poster les donnees saisie par utilisateur
     */
    createUser() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const username = document.querySelector("#username").value;
        let users = {
          email: email,
          password: password,
          username: username,
        };
        // Check that the user has filled in all the fields
        if (users.email == "" || users.password == "" || users.username == "") {
          users = {
            userVerification: false,
          };
        } // to send information to create an account
        axios
          .post(this.$localhost + "api/auth/signup", users)
          .then((res) => {
            console.log(res);
            this.$router.push("/Login");
          })
          .catch((error) => {
            console.log(error);
            document.getElementById("notfound").innerHTML =
              "Email address or username already used. ";
          });
      }
    },
  },
};
</script>

<style scoped>
#app {
  text-align: center;
}
.error {
  color: #e55252cb;
}
</style>