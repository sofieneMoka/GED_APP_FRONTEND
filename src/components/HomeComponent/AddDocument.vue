<template>

<div class="logoContainer">
  <img src="../../assets/Al_Baraka_Logo_copy.png" class="logo"/>
</div>
<form @submit.prevent="AddDocument" enctype="multipart/form-data">
  <div class="form-field">
    <div class="form-field-item">
      <div class="file-input">
        <input type="file" ref="file" id="file" class="file" v-on:change="handleFileUpload($event)"  accept="application/pdf" required>
      </div>    
    </div>
    <div class="form-field-item">
      <label>Name</label>
      <input type="text" placeholder="Name" class="input" v-model="name" required/>
    </div>
    <div class="form-field-item">
      <label>Status</label>
      <select name="status" id="role-select" class="departmentoption" v-model="status" required>
          <option value="Actif">Available</option>
          <option value="Blocked">Blocked</option>
      </select>
    </div>
  </div>

  <div class="form-field">
    <div class="form-field-item">
      <label>Note</label>
      <input type="text" placeholder="Note" class="input" v-model="note" required/>
    </div>
    <div class="form-field-item">
      <label>Category</label>
      <select name="nameCategory" id="role-select" class="departmentoption" v-model="nameCategory" @change="GetListSubCategoryByCategory($event.target.value)" required>
          <option 
            v-for="category in categories.Categories" :key='category.id'
            v-bind:value="category.name" >{{category.name}}</option>
      </select>
    </div>
    <div class="form-field-item">
      <label>Subcategory</label>
      <select name="nameSubCategory" id="role-select" class="departmentoption" v-model="nameSubCategory" required>
          <option 
            v-for="subcategory in subcategories.SubCategorys" :key='subcategory.id'
            :value="subcategory.name">{{subcategory.name}}</option>
      </select>
    </div>
  </div>

  <div class="form-field">
    <div class="form-field-item-description">
      <label>Description</label>
      <textarea  placeholder="Description" class="input" v-model="description" required/>
    </div>
    <div class="form-field-item">
      <label>Tags</label>
      <input type="text" placeholder="Tags" class="input" v-model="tag" required/>
    </div>
  </div>
  <hr/>
  <!-- <div class="form-field">
    <div class="form-field-item">
      <label>Name</label>
      <input type="text" placeholder="Name" class="input" v-model="name" required/>
    </div>
    <div class="form-field-item">
      <label>Status</label>
      <select name="status" id="role-select" class="departmentoption" v-model="status" required>
          <option value="Actif">Available</option>
          <option value="Blocked">Blocked</option>
      </select>
    </div>
  </div> -->
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
  width: 1000px;
  position: relative;
  margin: auto;
}
label{
  color: white;
  font-size: 20px;
  font-weight: 400;
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
.form-field-item{
  width: 300px;
}
.form-field-item-description{
  width: 65%;
}
textarea {
	height: 100px;
	resize: none;
  border-radius: 4px;
}
.Signup{
  color: #f36d21;
  font-weight: 700;
}
#file{
  font-size: 16px;
  font-weight: 500;
}
form .input {
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
import VueJwtDecode from "vue-jwt-decode";


export default{
  name:"AddDocument",
  data(){
    return {
        idUser:"",
        idDoc:"",
        name:"",
        status:"",
        tag:"",
        description:"",
        note:"",
        nameSubCategory:"",
        nameCategory:"",
        file:"",
        msg:"",
        size:"",
        subcategories:[],
        categories:[]
      };
    },
    methods:{   
      handleFileUpload(event) {
      this.file = event.target.files[0];
      console.log(this.file)
      },
      getAllSubCategory(){
        const path = `http://127.0.0.1:5000/GetAllSubCategory`
        axios.get(path).then((res) => {
          this.subcategories=res.data
        })
        .catch(err =>{
        console.log(err);
        });
      },
      AddDocument(){
        let token = localStorage.getItem('token');
        let decode = VueJwtDecode.decode(token);
        console.log(decode.id)  
        /*
                Initialize the form data
            */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            this.size = this.file.size,

            formData.set('file', this.file);
            formData.set('size', this.size);
            formData.append('name', this.name);
            formData.append('status', this.status);
            formData.append('note', this.note);
            formData.append('description', this.description);
            formData.append('tag', this.tag);
            formData.append('nameSubCategory', this.nameSubCategory);
            formData.append('nameCategory', this.nameCategory);


        // const headers = { 'Content-Type': 'multipart/form-data' };
        
        
        const path = `http://127.0.0.1:5000/UploadDocument/${decode.id}`
        axios.post(path,
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
          )
        .then((res) => {
              if (res.data == "0" ){
                this.msg="Name already exist";
                this.showErrorAlert()
              }
              if (res.data == "1" ){
                this.showSuccessAlert();
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
      title: "Document created successfully",
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "http://localhost:8081";
      }
      })
    },
      getAllCategory(){
        const path = `http://127.0.0.1:5000/GetAllCategories`
        axios.get(path).then((res) => {
          this.categories=res.data
        })
        .catch(err =>{
        console.log(err);
        });
      },
      GetListSubCategoryByCategory(event){
        const path = `http://127.0.0.1:5000/GetListSubCategoryByCategory/${event}`
        axios.get(path).then((res) => {
          this.subcategories=res.data
        })
        .catch(err =>{
        console.log(err);
        });
      },
    },created(){
      this.getAllCategory();
    }
}
</script>
