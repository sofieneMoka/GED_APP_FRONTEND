<template>

  <div class="container">
    <section>
      <div class="header">
        <RouterLink to="/AddDocument" class="nav-item">
          <button class="button-5" role="button">+ Add new document</button>
        </RouterLink>
      </div>
  <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th class="thUserImg"></th>
          <th>Name</th>
          <th>Creator</th>
          <th>Tags</th>
          <th>Creation date</th>
          <th>Action</th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
        <tr v-for="document in documents.Documents" :key='document.id'>
          <td class="tdUserImg"><img src="../../assets/document-icon.png" class="userimg"/></td>
          <td>{{document.name}}</td>
          <td>{{document.nameCreator}}</td>
          <td>{{document.tag}}</td>
          <td>{{document.creationDate}}</td>
          <td>
            <div class="action">
              <RouterLink :to="{name:'UpdateDocument', 
              params:{idDoc:document.id, idUser:getUserDetails().id, name:document.name,  nameCategory:document.nameCategory, nameSubCategory:document.nameSubCategory, tag:document.tag, status:document.status, description:document.description, note:document.note}}" 
              class="nav-item"
              >
                <button class="button-5 update" role="button">Update</button>
              </RouterLink>
              <button class="button-5 delete" role="button" v-on:click="showDeleteDocument(document.id)">Delete</button>
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
.container{
  margin-left: -180px;
}
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
  margin-top: 50px;
  margin-left: 180px;
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
  width: 120%;
 }
.tbl-content{
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  max-height:350px;
  overflow-x:auto;
  margin-top: 0px;
  border: 1px solid rgba(255,255,255,0.3);
  width: 120%;
}
th{
  padding: 15px 0;
  text-align: center;
  font-weight: 600;
  font-size: 15px;
  color: #fff;
  text-transform: uppercase;
  margin: 0;
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
  margin: 0;
}
.update{
  background-color: #f0940a;
  width: 70px;
  margin: 0;
}
.userimg{
  height: 40px;
}
.thUserImg , .tdUserImg{
  width: 0;
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
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: 'DocumentsList',
  data(){
    return {
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
          return "null"
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
      showDeleteDocument(_id){
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
          const path = `http://127.0.0.1:5000/DeleteDocument/${_id}`
          axios.delete(path)
          .then(() => {
                  Swal.fire(
                    'Deleted!',
                    'Document has been deleted.',
                    'success'
                  ).then((result) => {
                    if (result.isConfirmed){
                      this.getAllDocuments();
                    }
                  })
              })
          .catch(err =>{
          console.log(err);
          });
        }
      })
      },
    },created(){
      this.getAllDocuments();
      this.getUserDetails();
    }
}
</script>
