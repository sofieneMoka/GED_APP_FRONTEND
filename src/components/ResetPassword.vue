<template>

<div class="logoContainer">
  <img src="../assets/Al_Baraka_Logo_copy.png" class="logo"/>
</div>

  <div class="SendCode">
    <div>
      <p @click="ResendCode">
            Click here to send the code!
      </p>
    </div>
  </div>

<form @submit.prevent="ResetPassword">


  <div class="form-field">
    <input type="text" name="otp" v-model="otp" placeholder="Code verification" required/>                         
  </div>

  <div class="form-field">
    <input type="password" name="password" v-model="password" placeholder="Password" required/>                         
  </div>
  
  <div class="form-field">
    <input type="password" name="password" v-model="Conf_password" placeholder="Confirm Password" required/>                         
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
form .form-field:nth-child(2)::before {
  background-image: url(../assets/password-icon.png);
  width: 16px;
  height: 16px;
}
form .form-field:nth-child(3)::before {
  background-image: url(../assets/password-icon.png);
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

.SendCode{
  font-size: 30px;
  text-align: center;
  color: #f36d21;
  font-weight: 600;
  cursor:pointer;
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
import Swal from 'sweetalert2/dist/sweetalert2.js'


export default{
  name:"ResetPassword",
  data(){
    return {
        Conf_password:"",
        password:"",
        otp:"",
        msg:"",
      };
    },
    methods:{
      ResetPassword(){
        const path = 'http://127.0.0.1:5000/VerifyCode'
        axios.post(path, {
          otp:this.otp,
        }).then((res) => {
          if(res.data == 0 ){
          this.msg="Invalid code!";
           this.showErrorAlert()
          }
          else if(res.data == 1){
            let email = localStorage.getItem('email');
            axios.put(`http://127.0.0.1:5000/ResetPassword/${email}`,
            {password:this.password,Conf_password:this.Conf_password})
              .then((res) => {
                if(res.data ==0){
                    this.msg="The password fields do not match";
                    this.showErrorAlert();
                }
                else{
                    this.msg="Password changed successfully";
                    this.path="http://localhost:8081/Signin";
                    localStorage.removeItem('email');
                    this.showSuccessAlert();
                }
              })
              .catch(err =>{
              console.log(err);
              });
          }
        })
        .catch(err =>{
        console.log(err);
        });
      },
      ResendCode(){
            let email = localStorage.getItem('email');
          axios.post(`http://127.0.0.1:5000/SendCode/${email}`)
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
