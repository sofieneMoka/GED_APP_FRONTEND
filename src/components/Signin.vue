<template>

<div class="logoContainer">
  <img src="../assets/Al_Baraka_Logo_copy.png" class="logo"/>
</div>

<loader :active="loaderActive"/>

<form @submit.prevent="Login">
  <div class="form-field">
    <input type="email" name="email" v-model="email" placeholder="Email" required/>
  </div>
  
  <div class="form-field">
    <input type="password" name="password" v-model="password" placeholder="Password" required/>                         
  </div>
  
  <div class="ForgetPassword">
    <div>
      <div>
        Forget password?
        <a class="Signup" @click="ResetPassword">
            Reset password
        </a>
      </div>
    </div>
  </div>

  <div class="form-field">
    <button class="btn" type="submit">Log in</button>
  </div>
</form>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis/css2?family=Poppins:wght@200;400;500&display=swap');

*{
  font-family: 'Poppins', sans-serif;
}
body {
  color: #4A4A4A;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.logoContainer{
  position: relative;
  margin: auto;
  width: 130px;
}

.logo{
  height: 130px;
}

form {
  width: 350px;
  position: relative;
  margin: auto;
}
form .form-field::before {
  font-size: 20px;
  position: absolute;
  left: 15px;
  top: 17px;
  color: #888888;
  content: " ";
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
}
form .form-field:nth-child(1)::before {
  background-image: url(../assets/user-icon.png);
  width: 20px;
  height: 20px;
  top: 15px;
}
form .form-field:nth-child(2)::before {
  background-image: url(../assets/lock-icon.png);
  width: 16px;
  height: 16px;
}
form .form-field {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
}

form .ForgetPassword{
font-weight: 600;
color: rgb(0, 0, 0);
text-align: center;
}

.SignupContainer{

position:absolute;
right: 10%;
left: 10%;
bottom:0;
font-weight: 600;
color: #fff;
text-align: center;
}

.Signup{
  color: #f36d21;
  font-weight: 700;
  cursor: pointer;
}

form input {
  font-family: inherit;
  width: 100%;
  outline: none;
  background-color: #fff;
  border-radius: 4px;
  border: none;
  display: block;
  padding: 0.9rem 0.7rem;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  font-size: 17px;
  color: #4A4A4A;
  text-indent: 40px;
}
form .btn {
  outline: none;
  border: none;
  cursor: pointer;
  display: inline-block;
  margin: 0 auto;
  padding: 0.9rem 2.5rem;
  text-align: center;
  background-color: rgba(230, 193, 134, 0.7);
  color: #fff;
  border-radius: 4px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  font-size: 17px;
}

</style>



<script>
import axios from 'axios';
import VueJwtDecode from "vue-jwt-decode";
import Swal from 'sweetalert2/dist/sweetalert2.js'


export default{
  name:"SignIn",
  data(){
    return {
        email:"",
        password:"",
        msg:"",
        path:"",
      };
    },
    methods:{
      Login(){
        const path = 'http://127.0.0.1:5000/Login'
        axios.post(path, {
          email:this.email,
          password:this.password,
        }).then((res) => {
          if(res.data == 0 ){
          this.msg="Invalid email!";
           this.showErrorAlert()
          }
          else if(res.data == 1){
            this.msg="Invalid password!";
            this.showErrorAlert()
          }
          else if(res.data == 2){
            localStorage.setItem( 'role', "admin")
            window.location.href="http://localhost:8081/AdminHome";
          }
          else{
          localStorage.setItem( 'token', res.data)
          let token = localStorage.getItem('token');
          let decode = VueJwtDecode.decode(token);
          console.log(decode.activate_acc)
          if(decode.activate_acc == 0){
            this.msg="Successfully connected, but you need to activate your account!";
            this.path="http://localhost:8081/Confirm_email";
            axios.post(`http://127.0.0.1:5000/SendCode/${decode.email}`)
              .catch(err =>{
              console.log(err);
              });
            this.showSuccessAlert()
          }
          else{
            this.msg="Successfully connected!";
            this.path="http://localhost:8081/";
            this.showSuccessAlert()
          }
          }
        })
        .catch(err =>{
        console.log(err);
        });
      },
      ResetPassword(){
          localStorage.setItem( 'email', this.email)
          axios.get(`http://127.0.0.1:5000/UserExist/${this.email}`,{email:this.email})
            .then((res) => {
              if (res.data == "0" ){
                this.msg="Email does not exist";
                this.showErrorAlert()
              }
              if (res.data == "1" ){
                window.location="http://localhost:8081/ResetPassword"
              }
            })
            .catch(err =>{
            console.log(err);
            });
      },
      showErrorAlert(){
      Swal.fire({
      title: this.msg,
      text: 'Pleas try again',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    },
      showSuccessAlert(){
      Swal.fire({
      title: this.msg,
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href=this.path;
      }
      })
    },
    },
}
</script>
