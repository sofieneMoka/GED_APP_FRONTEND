<template>

<div id="bg"></div>
  <div class="nav">
      <input type="checkbox" id="nav-check">
      <div class="nav-header">
        <RouterLink to="/" class="nav-title">
          <img src="./assets/Al_Baraka_Logo.png" class="logo"/>
        </RouterLink>
      </div>
      <div class="nav-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      
      <div class="nav-links">
        <RouterLink to="/" class="nav-item">
            Home
        </RouterLink>
        <RouterLink to="/AdminHome" class="nav-item" v-if="isAdmin()=='admin'">
            Dashboard
        </RouterLink>
        <RouterLink to="/Signin" class="nav-item" v-if="getUserDetails()=='null' && isAdmin()=='null'">
            Login
        </RouterLink>
        <RouterLink to="" class="nav-item" @click="Logout" v-else-if="getUserDetails()">
            Logout
        </RouterLink>
      </div>
    </div>
  <router-view/>
</template>

<style scoped>
@import url('https://fonts.googleapis/css2?family=Poppins:wght@200;400;500&display=swap');
* {
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
  height: 100%;
}
#bg {
  background-image: url('./assets/background.jpg');
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  filter: blur(5px);
  z-index:-1;
}

body {
  margin: 0px;
}

.nav {
  width: 100%;
  background-color: rgba(230, 193, 134, 0.4);
  position: relative;
  border-radius: 0.5rem;
}

.nav > .nav-header {
  display: inline;
}

.nav > .nav-header > .nav-title {
  display: inline-block;
  padding: 2px 0px 0px 10px;
}

.nav > .nav-header > .nav-title > .logo {
  height: 40px;
  cursor: pointer;
}

.nav > .nav-btn {
  display: none;
}

.nav > .nav-links {
  display: inline;
  float: right;
  font-size: 20px;
}

.nav > .nav-links > .nav-item {
  display: inline-block;
  padding: 10px 30px 13px 30px;
  text-decoration: none;
  color: #ffffff;
  font-weight: 600;
}

.nav > .nav-links > .nav-item:focus {
  background-color: rgba(230, 193, 134, 0.5);
}

.nav > .nav-links > .nav-item:hover {
  background-color: rgba(230, 193, 134, 0.5);
}

.nav > #nav-check {
  display: none;
}

@media (max-width:600px) {
  .nav > .nav-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .nav > .nav-btn > label {
    display: inline-block;
    padding: 13px;
  }
  .nav > .nav-btn > label:hover,.nav  #nav-check:checked ~ .nav-btn > label {
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
  .nav > .nav-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #eee;
  }
  .nav > .nav-links {
    position: absolute;
    display: block;
    width: 100%;
    background-color: rgba(230, 193, 134, 0.5);
    height: 50px;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 50px;
    left: 0px;
    border-radius: 0.5rem;
  }
  .nav > .nav-links > .nav-item {
    display: block;
    width: 100%;
  }
  .nav > #nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav > #nav-check:checked ~ .nav-links {
    height: auto;
    overflow-y: auto;
  }
}
</style>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from 'axios';

export default {
  methods:{
    getUserDetails(){
      if(localStorage.getItem('token') != null){
        let token = localStorage.getItem('token');
        let decode = VueJwtDecode.decode(token);
        return decode
      }
      else
        return "null"
    },
    isAdmin(){
      if(localStorage.getItem('role') != null){
        return "admin"
      }
      else
        return "null"
    },
    Logout(){
          localStorage.removeItem('role');
          const path = `http://127.0.0.1:5000/Logout`
          axios.get(path,{headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }}).then(() => {
          localStorage.removeItem('token');
          window.location.href = "http://localhost:8081/Signin";
        })
        .catch(err =>{err});
        window.location.href = "http://localhost:8081/Signin";
    }
  },
  created(){
    this.isAdmin();
    this.getUserDetails();
  }
};
</script>