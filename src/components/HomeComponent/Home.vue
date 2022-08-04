<template>

<div id="main">

<!-- ################################################-SIDE BAR-################################################ -->

 <div id="menu">
  
  <div class="sidebar open">

    <div style="display: flex ; flex-direction:column; justify-content: space-between; flex-grow: 1; max-height: calc(100% - 80px); ">
      <div
        id="my-scroll"
        style="margin: 6px 14px 0 14px;"
      >
        <ul class="nav-list">
          <li>
            <i class="bx bx-search" />
              <input
              type="text"
              placeholder="Search..."
              >
          </li>

          <div class="category_container"
             v-for="category in categories.Categories" :key='category.id'>
            <li>
              <a>
                <div class="Category_name">
                  <i class="bx bx-folder" />
                  <span>{{ category.name }}</span>
                  <div class="ListSubcategory"
                  v-for="subcategory in subcategoriesSideBar.SubCategories" :key='subcategory.id'>
                    <li class="li_Subcategory"  v-on:click="getDocumentsBySubcategory(subcategory.name)">
                      <i class="bx bx-folder" />
                      <span>{{subcategory.name}}</span>
                    </li>
                  </div>
                </div>
              </a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
 </div>

<!-- ################################################-SEARCH BAR-################################################ -->

<div id="Filtrage">
        <h3>Search for document</h3>
    <div class="container">
        <form @submit.prevent="SearchDocument">
        <div class="form-field"> 
            <div class="form-field-item">
                <input type="text" placeholder="Name..." v-model="name">
            </div>
            <div class="form-field-item">
                <input type="text" placeholder="Creator..." v-model="creatorname">
            </div>
            <div class="form-field-item">
            <select name="nameCategory" id="role-select" class="input" v-model="nameCategory" @change="GetListSubCategoryByCategory($event.target.value)">
                <option value="" disabled selected>Select category</option>
                <option 
                    v-for="category in categories.Categories" :key='category.id'
                    v-bind:value="category.name" >{{category.name}}</option>
            </select>
            </div>
            <div class="form-field-item">
            <select name="nameSubCategory" class="input" v-model="nameSubCategory">
                <option value="" disabled selected>Select subcategory</option>
                <option 
                    v-for="subcategory in subcategories.SubCategorys" :key='subcategory.id'
                    :value="subcategory.name">{{subcategory.name}}</option>
            </select>
            </div>
        </div>
        <div class="form-field"> 
            <div class="form-field-item">
                <input type="text" placeholder="Tags.." v-model="tag">
            </div>
            <div class="form-field-item">
                <!-- <input type="date" placeholder="MM" v-model="StartDate"> -->
                <input placeholder="Start Date..." v-model="StartDate" :type="'text'" onfocus="(type='date')">

            </div>
            <div class="form-field-item">
                <input placeholder="End Date..." v-model="EndDate" :type="'text'" onfocus="(type='date')">
            </div>
            <div class="form-field-item">
                <button class="btn" type="submit">Search</button>
            </div>
        </div>
        </form>
    </div>
    <button class="btn reload" v-on:click="getAllDocuments()"><i class="bx bx-refresh" /></button>
</div>




 <div id="contenu">
  <DocumentsList :Listdata="documents"/>
 </div>
</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Filtrage, #menu, #contenu, #footer {
padding:2px 0;
}
#Filtrage {
background-color: rgba(230, 193, 134, 0.1);
margin-left: 10%;
height: 170px;
width: 105%;
border-radius: 0.5rem;
margin-bottom: -30px;
}
#main {
max-width:960px;
margin:auto;
}
#contenu{
  margin-left: 70px;
}
h3{
    font-size: 25px;
    font-weight: 500;
    text-transform: uppercase;
    color: white;
    text-align: center;
    margin: 0;
}
.container{
    margin: 3px 10px 0 10px;
}
.form-field{
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
  position: relative;}
input , .input{
    font-size: 15px;
    color: rgb(255, 255, 255);
    font-weight: 400;
    outline: none;
    height: 50px;
    padding: 0 20px 0 20px;
    width: 200px;
    border: none;
    border-radius: 12px;
    transition: all 0.5s ease;
    background-color: rgb(136, 110, 68,0.8);
  }
  input::placeholder{
    color: rgb(255, 255, 255);
  }
  .btn {
  background-clip: padding-box;
  background-color: rgba(230, 193, 134, 0.8);
  border: 1px solid transparent;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: 200px;
}
.reload{
  width: 70px;
  height: 60px;
}
.bx-refresh{
  font-size: 40px;
  margin-left: -8px;
  margin-top: -3px;
}
.btn:hover,
.btn:focus {
  background-color: rgba(230, 193, 134, 1);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  background-color: rgba(230, 193, 134, 0.7);
  box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
  transform: translateY(0);
}/* Google Font Link */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
  @import url('https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css');
  * {
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  .Subcategory_name{
    flex-direction: column;
  }
  body {
    transition: all 0.5s ease;
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    margin-left: 0.5rem;
    height: 100%;
    min-height: min-content;
    width: 250px;
    background-color: rgba(230, 193, 134, 0.1);
    z-index: 99;
    border-radius: 0.5rem;
  }
  .sidebar i {
    color: white;
    height: 60px;
    min-width: 50px;
    font-size: 28px;
    text-align: center;
    line-height: 60px;
  }
  .sidebar .nav-list {
    margin-top: 20px;
  }
  .sidebar li {
    position: relative;
    margin: 8px 0;
    list-style: none;
  }
  .sidebar li .tooltip {
    position: absolute;
    top: -20px;
    z-index: 3;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 400;
    opacity: 0;
    white-space: nowrap;
    pointer-events: none;
    transition: 0s;
  }
  .sidebar input {
    font-size: 15px;
    color: rgb(255, 255, 255);
    font-weight: 400;
    outline: none;
    height: 50px;
    padding: 0 20px 0 50px;
    width: 100%;
    border: none;
    border-radius: 12px;
    transition: all 0.5s ease;
    background-color: rgb(136, 110, 68);
  }
  .sidebar input::placeholder{
    color: rgb(255, 255, 255);
  }
  .sidebar .bx-search {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-size: 22px;
  }
  .sidebar li a {
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 12px;
    align-items: center;
    text-decoration: none;
    transition: all 0.4s ease;
    background-color: rgba(230, 193, 134, 0.4);
  }
  .sidebar li a:hover {
    background: rgb(240, 148, 10,0.2);
  }
  .sidebar .category_container{
    height: 60px;
    overflow-y: hidden;
    overflow-y: scroll;
  }
  .sidebar .category_container:hover{
    max-height: 200px;
    height: auto;
    transition: all 0.4s;
  }
  .sidebar li a .Category_name {
    color: white;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    opacity: 1;
    pointer-events: auto;
    transition: 0.4s;
    cursor: pointer;
  }
  .sidebar li a:hover .Category_name,
  .sidebar li a:hover i {
    transition: all 0.5s ease;
    color: black;
  }
  .sidebar .ListSubcategory{
    margin-left: 15px;
    min-height: 60px;
    width: 180px;
    border-radius: 1rem;
  }
  .sidebar .li_Subcategory{
    height: 35px;
    padding-bottom: 3rem;
    cursor: pointer;
  }
  .sidebar .li_Subcategory:hover{
    background: rgba(182, 126, 43, 0.7);
    border-radius: 0.5rem;
  }
  .sidebar li i {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    border-radius: 12px;
  }
  .my-scroll-active{
    overflow-y: auto;
  }
  #my-scroll {
    overflow-y: auto;
  }
  #my-scroll::-webkit-scrollbar{
    border-radius: 10px;
    height: 5px;
    width: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
  }
  .category_container::-webkit-scrollbar{
    border-radius: 10px;
    height: 5px;
    width: 5px;
  }
</style>


<script>
import DocumentsList from './DocumentsList.vue';
import VueJwtDecode from "vue-jwt-decode";
import axios from 'axios';


export default {
  name: 'HoMe',
  components: {
    DocumentsList
},
  data(){
    return {
        items:['1','2','3'],
        creatorname:"",
        name:"",
        nameCategory:"",
        nameSubCategory:"",
        tag:"",
        StartDate:"",
        EndDate:"",
        subcategories:[],
        subcategoriesSideBar:[],
        categories:[],
        documents:[],
    };
  },
  methods:{
    getUserDetails(){
      if(localStorage.getItem('token') != null){
        let token = localStorage.getItem('token');
        let decode = VueJwtDecode.decode(token);
        return decode
      }
      else
        return null
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
      getAllSubCategories(){
        const path = `http://127.0.0.1:5000/GetAllSubCategory`
        axios.get(path).then((res) => {
          this.subcategoriesSideBar=res.data
        })
        .catch(err =>{
        console.log(err);
        });
      },
      getAllDocuments(){
        const path = `http://127.0.0.1:5000/GetAllDocument`
        axios.get(path).then((res) => {
          this.documents=res.data
        })
        .catch(err =>{
        console.log(err);
        });
      },
      getDocumentsBySubcategory(x){
        const path = `http://127.0.0.1:5000/SearchDocumentBySubCategory/${x}`
        axios.get(path).then((res) => {
          this.documents=res.data
        })
        .catch(err =>{
        console.log(err);
        });
      },
      SearchDocument(){
            if (this.name == ""){
                this.name = "Null"
            }
            if (this.creatorname == ""){
                this.creatorname = "Null"
            }
            if (this.tag == ""){
                this.tag = "Null"
            }
            if (this.StartDate == ""){
                this.StartDate = "Null"
            }
            if (this.EndDate == ""){
                this.EndDate = "Null"
            }
            if (this.nameSubCategory == ""){
                this.nameSubCategory = "Null"
            }
            if (this.nameCategory == ""){
                this.nameCategory = "Null"
            }
        const path = `http://127.0.0.1:5000/SearchDocumentWithFilters/${this.name}/${this.creatorname}/${this.tag}/${this.StartDate}/${this.EndDate}/${this.nameSubCategory}/${this.nameCategory}`
        axios.get(path).then((res) => {
          this.documents=res.data
        })
        .catch(err =>{
        console.log(err);
        });
      },
  },
  created(){
    this.getUserDetails();
    this.getAllCategory();
    this.getAllSubCategories();
    this.getAllDocuments();
  }
};
</script>
