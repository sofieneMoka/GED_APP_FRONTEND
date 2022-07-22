<template>
  <div class="ConfirmEmailContainer">
    <div class="welcom">
      <h1>Email confirmation</h1>
      <p class="sous_titre"> A code will be sent to your email address, please copy and paste it below
    </p>
    </div>

    <form @submit.prevent="EmailValidation">
      <div class="form-field">
        <input type="text" placeholder="code" v-model="otp" required/>
      </div>

        <div class="ForgetPassword">
        <div>
          <p v-on:click="SendCodeValidation">
            Resend the code
          </p>
        </div>
      </div>

      <div class="form-field">
        <button class="btn" type="submit">Confirm email</button>
      </div>
    </form>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis/css2?family=Poppins:wght@200;400;500&display=swap');

*{
  font-family: 'Poppins', sans-serif;
}
.ConfirmEmailContainer{
  background-color: rgba(230, 193, 134, 0.4);
  width: 65%;
  margin: 0 auto;
  border-radius: 1rem;
}
h1{
  font-size: 50px;
}
.sous_titre{
  width: 70%;
  font-size: 20px;
  margin: 0 auto 5% auto;
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
.welcom{
  margin-top: 10%;
  text-align: center;
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
  background-image: url(../assets/lock-icon.png);
  width: 20px;
  height: 20px;
  top: 15px;
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
cursor: pointer;
color: rgb(0, 0, 0);
text-align: center;
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
  margin-bottom: 5%;
}

</style>

<script>
import axios from 'axios';
import VueJwtDecode from "vue-jwt-decode";
import Swal from 'sweetalert2/dist/sweetalert2.js'


export default{
  name:"Confirm_Email",
  data(){
    return {
        otp:"",
      };
    },
    methods:{
      EmailValidation(){
        const path = `http://127.0.0.1:5000/validate/${this.getUserDetails().email}`
        axios.post(path, {
          otp:this.otp,
        },{headers:{
          'Authorization': `Basic ${localStorage.getItem('token')}`
        }}).then((res) => {
          if(res.data=="0"){
            console.log("invalid code")
            this.showErrorAlert();
          }else{
            localStorage.setItem( 'token', res.data)
            this.showSuccessAlert();           
          }
        })
        .catch(err =>{
        console.log(err);
        });
      },
      SendCodeValidation(){
        const path = `http://127.0.0.1:5000/SendCode/${this.getUserDetails().email}`
        axios.post(path)
        .catch(err =>{
        console.log(err);
        });
      },
      getUserDetails(){
        if(localStorage.getItem('token') != null){
          let token = localStorage.getItem('token');
          let decode = VueJwtDecode.decode(token);
          console.log(decode.activate_acc)
          return decode
        }
        else
          return "null"
      },
      showErrorAlert(){
      // Use sweetalert2
      Swal.fire({
      title: 'Code Invalid!',
      text: 'Pleas try again',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    },
      showSuccessAlert(){
      // Use sweetalert2
      Swal.fire({
      title: 'Account activated!',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
  /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        window.location.href = "http://localhost:8081/"
      }
      })
    },
    },created(){
      this.getUserDetails();
    }
}
</script>
