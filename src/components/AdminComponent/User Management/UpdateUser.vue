<template>

<div class="logoContainer">
  <img src="../../../assets/Al_Baraka_Logo_copy.png" class="logo"/>
</div>
<form @submit.prevent="UpdateUser">
  <div class="form-field">
    <input type="text" placeholder="First name" v-model="f_name" required/>
  </div>
  
  <div class="form-field">
    <input type="text" placeholder="Last name" v-model="l_name" required/>
  </div>

    <div class="form-field">
    <select name="role" id="role-select" class="departmentoption" v-model="role">
        <option value="Role 1">Role 1</option>
        <option value="Role 2">Role 2</option>
        <option value="Role 3">Role 3</option>
        <option value="Role 4">Role 4</option>
        <option value="Role 5">Role 5</option>
        <option value="Role 6">Role 6</option>
    </select>
  </div>

    <div class="form-field">
    <select name="status" id="status-select" class="departmentoption" v-model="status">
        <option value="Active">Active</option>
        <option value="Suspensed">Suspensed</option>
    </select>
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
form .form-field:nth-child(2)::before {
  background-image: url(../../../assets/user-icon.png);
  width: 16px;
  height: 16px;
}
form .form-field:nth-child(3)::before {
  background-image: url(../../../assets/department-icon.png);
  width: 16px;
  height: 16px;
}
form .form-field:nth-child(4)::before {
  background-image: url(../../../assets/status-icon.png);
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
  name:"UpdateUser",
  data(){
    return {
      User:{
        id:"",
        f_name:"",
        l_name:"",
        role:"",
        status:"",
        msg:"",
        },
      };
    },
    methods:{
      UpdateUser(){
        const path = `http://127.0.0.1:5000/Update/${this.id}`
        axios.put(path, {
          f_name:this.f_name,
          l_name:this.l_name,
          role:this.role,
          status:this.status
          }).then(()=>{
            this.showSuccessAlert();
          })
        .catch(err =>{
        console.log(err);
        });
      },
      showSuccessAlert(){
      Swal.fire({
      title: "User updated successfully",
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "http://localhost:8081/ListUser";
      }
      })
    },
    },created(){
            this.id = this.$route.params.id;
            this.f_name = this.$route.params.f_name;
            this.l_name = this.$route.params.l_name;
            this.role = this.$route.params.role;
            this.status = this.$route.params.status;
    }
}
</script>
