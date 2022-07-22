<template>

<div class="logoContainer">
  <img src="../../../assets/Al_Baraka_Logo_copy.png" class="logo"/>
</div>
<form @submit.prevent="UpdateDirection">
  <div class="form-field">
    <input type="text" placeholder="Name" v-model="name" required/>
  </div>

  <div class="form-field">
      <button class="btn" type="submit">Submit</button>
  </div>
</form>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis/css2?family=Poppins:wght@200;400;500&display=swap');

*{
  font-family: 'Poppins', sans-serif;
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
  background-image: url(../../../assets/user-icon.png);
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

.Signup{
  color: #f36d21;
  font-weight: 700;
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

.departmentoption{
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
  name:"UpdateDirection",
  data(){
    return {
      User:{
        id:"",
        name:"",
        msg:"",
        },
      };
    },
    methods:{
      UpdateDirection(){
        const path = `http://127.0.0.1:5000/UpdateDirection/${this.id}`
        axios.put(path, {
          name:this.name,
          }).then(()=>{
            this.showSuccessAlert();
          })
        .catch(err =>{
        console.log(err);
        });
      },
      showSuccessAlert(){
      Swal.fire({
      title: "Direction updated successfully",
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "http://localhost:8081/ListDirection";
      }
      })
    },
    },created(){
            this.id = this.$route.params.id;
            this.name = this.$route.params.name;
    }
}
</script>
