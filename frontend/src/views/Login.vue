<template>
  <main id="app">
    <h1>Welcome to Groupomania</h1>
    <form class="px-4 py-3 signin">
      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" v-model="email" id="email" aria-required="true" required /><br>
        <span class="error" v-if="(!$v.email.required && $v.email.$dirty)">Please provide a valid email address.</span>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" v-model="password" id="password" aria-required="true" required /><br>
        <span class="error" v-if="(!$v.password.required && $v.password.$dirty )">Please choose a password with at least 8 characters, 1 uppercase letter, 1 lowercase letter, and no spaces.</span>
        <span class="error" v-if="(!$v.password.valid && !$v.password.minLength )">Please choose a password with at least 8 characters, 1 uppercase letter, 1 lowercase letter, and no spaces.</span>
      </div>
      <button type="submit" class="btn btn-danger signup" v-on:click="loginUser()">
        Login
      </button><br>
      <span id="notfound" class="error"> </span>
    </form>
    <div class="dropdown-divider separation"></div>
    <p class="dropdown-item encouragement">
      Not a member yet ? Please signup !
    </p>
    <router-link class="btn btn-danger" to="/Signup">Signup</router-link>

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
  name: "Login",
  components: {
    Footer,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: {
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
  methods: {
    loginUser() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const user = {
          email: email,
          password: password,
        };

        axios
          .post(this.$localhost + "api/auth/login", user, {
            header: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            this.$router.push("/Home");
          })
          .catch((error) => {
            console.log(error);
            document.getElementById("notfound").innerHTML =
              "User not found. Please check your login informations. ";
          });
      } else {
        document.getElementById("notfound").innerHTML =
          "User not found. Please check your login informations. ";
      }
    },
  },
};
</script>

<style scoped>
#app {
  text-align: center;
}
.signin {
  width: 50%;
  margin: 70px auto auto auto;
}
.signup {
  margin-bottom: 40px;
}
.separation {
  margin-bottom: 50px;
  padding-bottom: 3em;
}
.encouragement {
  padding: 0 !important;
}
.error {
  color: #e55252cb;
}
@media (max-width: 1024px) {
  .signin {
    width: 100%;
    margin: 0;
  }
}
@media (max-width: 1024px) {
  h1 {
    font-size: 20px !important;
  }
}
</style>