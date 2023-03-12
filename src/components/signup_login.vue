<template>
  <div class="background" style="margin-left">
    <div class="section">
      <div class="container">
        <div class="row full-height justify-content-center">
          <div class="col-12 text-center align-self-center">
            <div class="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 class="mb-0 pb-3">
                <span class="heading">Log In | </span
                ><span class="heading">Sign Up</span>
              </h6>
              <input
                class="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label for="reg-log"></label>
              <div class="card-3d-wrap mx-auto">
                <div class="card-3d-wrapper">
                  <div class="card-front">
                    <div class="center-wrap">
                      <div class="section text-center">
                        <h4 class="mb-4 pb-3 loginsignup">Log In</h4>
                        <div class="form-group">
                          <input
                            type="email"
                            name="logemail"
                            class="form-style"
                            placeholder="Your Email"
                            id="logemail"
                            autocomplete="off"
                            v-model="email"
                          />
                          <i class="input-icon uil uil-at"></i>
                        </div>
                        <div class="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            class="form-style"
                            placeholder="Your Password"
                            id="logpass"
                            autocomplete="off"
                            v-model="password"
                          />
                          <i class="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button class="btn mt-4" @click="loginUser()">
                          SUBMIT
                        </button>
                        <div class="mb-0 mt-4 text-center">
                          <div class="link link-yellow">Forgot Password?</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-back">
                    <div class="center-wrap">
                      <div class="section text-center">
                        <h4 class="mb-4 pb-3 loginsignup">Sign Up</h4>
                        <div class="form-group">
                          <input
                            type="email"
                            name="userEmail"
                            class="form-style"
                            placeholder="Your Email"
                            id="userEmail"
                            autocomplete="off"
                            v-model="userEmail"
                          />
                          <i class="input-icon uil uil-user"></i>
                        </div>
                        <div class="form-group mt-2">
                          <input
                            type="password"
                            name="Userpass"
                            class="form-style"
                            placeholder="Your password"
                            id="Userpass"
                            autocomplete="off"
                            v-model="Userpassword"
                          />
                          <i class="input-icon uil uil-at"></i>
                        </div>
                        <div class="form-group mt-2">
                          <input
                            type="password"
                            name="Userconfirmpass"
                            class="form-style"
                            placeholder="Confirm Password"
                            id="Userconfirmpass"
                            autocomplete="off"
                            v-model="confirmPassword"
                          />
                          <i class="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button class="btn mt-4" @click="SignUpUser()">
                          submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { authenticateUser, registerUser } from '../services/APIServices';
import {ref} from "vue";

let email = ref("");
let password = ref("");


let userEmail = ref("");
let Userpassword = ref("");
let confirmPassword = ref("");


    // const  loginUser =() =>{
    // authenticateUser(email.value,password.value)
    // .then((response)=>{
    //   window.location.href = "/profile/:id"})
    //   .catch(error=> console.log(error))
    // }
    // // const onSubmitSignup = () => {
    // //   window.location.href = "/";
    // // };


    const loginUser = () => {
      authenticateUser(email.value, password.value)
    .then((response) => {
      console.log(email.value, password.value);
      localStorage.setItem("user" , JSON.stringify(response));
      console.log(response);
      window.location.href = "/profile/" + response.id;
    })
    .catch((error) => console.log(error));
};


const SignUpUser = () => {
  // console.log(userEmail, Userpassword, confirmPassword);
      registerUser(userEmail.value, Userpassword.value, confirmPassword.value)
      // console.log(logemail.value, logpass.value, logpass.value)
    .then((response) => {
      // localStorage.setItem("user" , JSON.stringify(response.data));
      // console.log(response);
      window.location.href = "/";
    })
    .catch((error) => console.log(error));
};

</script>
  
  

<script>
export default {
  name: "signup_login",
  props: {
    msg: String,
  },
 
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
@import url("./styles.css");
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>