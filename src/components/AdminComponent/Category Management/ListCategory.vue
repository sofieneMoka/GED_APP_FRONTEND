<template>

  <div class="container">
    <section>
      <div class="header">
        <h1>List of categories</h1>
        <RouterLink to="/AddCategory" class="nav-item">
          <button class="button-5" role="button">+ Add new category</button>
        </RouterLink>
      </div>
  <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th class="thUserImg"></th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
        <tr v-for="category in categories.Categories" :key='category.id'>
          <td class="tdUserImg"><img src="../../../assets/category-icon.png" class="userimg"/></td>
          <td>{{category.name}}</td>
          <td>
            <div class="action">
              <RouterLink :to="{name:'UpdateCategory', params:{id:category.id, name:category.name}}" class="nav-item">
                <button class="button-5 update" role="button">Update</button>
              </RouterLink>
              <button class="button-5 delete" role="button" v-on:click="showDeleteCategory(category.id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  font-family: 'Poppins', sans-serif;
  text-align: center;
  width: 100%;
  height: 5.5rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
  margin-top: -15px;
}
h1{
  font-size: 40px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 300;
  text-align: center;
  margin-bottom: 15px;
}
/* CSS */
.button-5 {
  align-items: center;
  background-clip: padding-box;
  background-color: rgba(230, 193, 134, 0.8);
  border: 1px solid transparent;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}
.nav-item{
  text-decoration: none;
}
.button-5:hover,
.button-5:focus {
  background-color: rgba(230, 193, 134, 1);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

.button-5:hover {
  transform: translateY(-1px);
}

.button-5:active {
  background-color: rgba(230, 193, 134, 0.7);
  box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
  transform: translateY(0);
}
table{
  width:100%;
  table-layout: fixed;
}
.tbl-header{
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background-color: rgba(230, 193, 134, 0.6);
  height: 50px;
 }
.tbl-content{
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  max-height:350px;
  overflow-x:auto;
  margin-top: 0px;
  border: 1px solid rgba(255,255,255,0.3);
}
th{
  padding: 15px 0;
  text-align: center;
  font-weight: 600;
  font-size: 15px;
  color: #fff;
  text-transform: uppercase;
}
td{
  padding: 5px 0 5px 0;
  text-align: center;
  vertical-align:middle;
  word-wrap: break-word;
  color: #fff;
  border-bottom: solid 1px rgba(255,255,255,0.3);
  background-color: rgba(182, 121, 29, 0.3);
}
.action{
  display: inline-flex;
}
.delete{
  background-color: red;
  width: 70px;
}
.update{
  background-color: #f0940a;
  width: 70px;
}
.userimg{
  height: 40px;
}
.tdUserImg,.thUserImg{
  width: 20px;
  padding-left: 15px;
}


/* demo styles */

@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,300,700);
body{
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
  font-family: 'Roboto', sans-serif;
}
section{
  margin: 10px;
}

/* for custom scrollbar for webkit browser*/

::-webkit-scrollbar {
    width: 6px;
} 
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
} 
::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
}
</style>




<script>
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export default {
  name: 'ListCategory',
  data(){
    return {
        categories:[],
      };
    },
    methods:{
      getAllCategories(){
        const path = `http://127.0.0.1:5000/GetAllCategories`
        axios.get(path).then((res) => {
          this.categories=res.data
        })
        .catch(err =>{
        console.log(err);
        });
      },
      showDeleteCategory(_id){
        Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const path = `http://127.0.0.1:5000/DeleteCategory/${_id}`
          axios.delete(path)
          .catch(err =>{
          console.log(err);
          });
          Swal.fire(
            'Deleted!',
            'Category has been deleted.',
            'success'
          ).then((result) => {
            if (result.isConfirmed){
              this.getAllCategories();
            }
          })
        }
      })
      },
    },created(){
      this.getAllCategories();
    }
}
</script>
