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
          <th>Subcategory</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
        <tr v-for="document in Listdata.Documents" :key='document.id'>
          <td class="tdUserImg" v-on:click="this.$router.push('/ViewDocument')"><img src="../../assets/document-icon.png" class="userimg"/></td>
          <td>{{document.name}}</td>
          <td>{{document.nameCreator}}</td>
          <td>{{document.nameSubCategory}}</td>
          <td>{{document.status}}</td>
          <td>
            <div class="action">
              <RouterLink :to="{name:'UpdateDocument', 
              params:{idDoc:document.id, idUser:getUserDetails().id, name:document.name,  nameCategory:document.nameCategory, nameSubCategory:document.nameSubCategory, tag:document.tag, status:document.status, description:document.description, note:document.note}}" 
              class="nav-item"
              >
                <button class="button-5 update" role="button">Update</button>
              </RouterLink>
              <button class="button-5 delete" role="button" v-on:click="showDeleteDocument(document.id)">Delete</button>
              <button class="button-5 detail" role="button" v-on:click="openModel(document.id)">Detail</button>
              <div v-if="myModel">
                <transition name="model">
                <div class="modal-mask">
                  <div class="modal-wrapper">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="wrapper">
                          <div class="product-img">
                          </div>
                          <div class="product-info">
                            <div class="product-text">
                              <h1>Document detail</h1>
                              <button type="button" class="button-5 closeModal" @click="myModel=false"><span aria-hidden="true">&times;</span></button>
                              <h2>-Name : {{documentDetail.name}}</h2>
                              <h2>-Format : {{documentDetail.Format}}</h2>
                              <h2>-Size : {{documentDetail.size}}</h2>
                              <h2>-Creator name : {{documentDetail.nameCreator}}</h2>
                              <h2>-Status : {{documentDetail.status}}</h2>
                              <h2>-Path : {{documentDetail.path}}</h2>
                              <h2>-Note : {{documentDetail.note}}</h2>
                              <h2>-Tags : {{documentDetail.tag}}</h2>
                              <h2>-Desciption : {{documentDetail.description}}</h2>
                              <h2>-Category : {{documentDetail.nameCategory}}</h2>
                              <h2>-Subcategory : {{documentDetail.nameSubCategory}}</h2>
                              <h2>-Creation date : {{documentDetail.creationDate}}</h2>
                              <h2>-Last modification : {{documentDetail.lastModification}}</h2>
                              <h2>-Name modificator : {{documentDetail.nameModificator}}</h2>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                  </div>
                </div>
                </transition>
              </div>
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
  width: 119.8%;
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
  padding: 5px -15px 5px -15px;
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
  width: 65px;
  margin: 0;
}
.update{
  background-color: #f0940a;
  width: 65px;
  margin: 0;
}
.detail{
  background-color: #0a81f0;
  width: 65px;
  margin: 0;
}
.userimg{
  height: 30px;
  cursor: pointer;
}
.userimg:hover{
  height: 35px;
}
.thUserImg , .tdUserImg{
  width: 0;
  padding-left: 10px;
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

   .modal-mask {
     position: fixed;
     z-index: 9998;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, .5);
     display: table;
     transition: opacity .3s ease;
   }
  .modal-content{
    border-radius: 1rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    background-color: rgba(230, 193, 134, 0.4);
  }
   .modal-wrapper {
     display: table-cell;
     vertical-align: middle;
   }
   
.wrapper {
  height: 420px;
  border-radius: 7px 7px 7px 7px;
  /* VIA CSS MATIC https://goo.gl/cIbnS */
  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
}

.product-img {
  float: right;
  height: 420px;
  width: 270px;
  background-image: url('../../assets/document.jpg');
  background-size: cover;
  border-radius: 0px 7px 7px 0px;
}

.product-img img {
  border-radius: 7px 0 0 7px;
}

.product-info {
  height: 420px;
  width: 550px;
  border-radius: 7px 7px 10px 7px;
}



.product-text h1 {
  margin: -20px 0 35px -35px;
  padding-top: 32px;
  font-size: 34px;
  font-weight: 700;
  color: #000000;
}

.product-text h1,
.product-price-btn p {
  font-family: 'Bentham', serif;
}

.product-text h2 {
  margin: 2px 0 0 25px;
  font-size: 13px;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  color: #000000;
  letter-spacing: 0.2em;
  text-align: left;
}


.product-price-btn {
  height: 103px;
  width: 327px;
  margin-top: 17px;
  position: relative;
}

.product-price-btn p {
  display: inline-block;
  position: absolute;
  top: -13px;
  height: 50px;
  font-family: 'Trocchi', serif;
  margin: 0 0 0 38px;
  font-size: 28px;
  font-weight: lighter;
  color: #474747;
}

span {
  display: inline-block;
  height: 50px;
  font-family: 'Suranna', serif;
  font-size: 34px;
}

.product-price-btn button {
  float: right;
  display: inline-block;
  height: 50px;
  width: 176px;
  margin: 0 40px 0 16px;
  box-sizing: border-box;
  border: transparent;
  border-radius: 60px;
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #ffffff;
  background-color: #9cebd5;
  cursor: pointer;
  outline: none;
}

.product-price-btn button:hover {
  background-color: #79b0a1;
}

.closeModal{
  top: 0;
  right: 0;
  position: absolute;
  margin-right: 50px;
  height: 65px;
  width: 65px;
}
</style>




<script>
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: 'DocumentsList',
  props:['Listdata'],
  data(){
    return {
        documentDetail:"",
        documents:[],
        myModel:false,
      };
    },
    methods:{
      openModel(IdDocument){
        this.myModel = true;
        const path = `http://127.0.0.1:5000/GetDocumentDetails/${IdDocument}`
        axios.get(path).then((res) => {
          this.documentDetail=res.data
        })
        .catch(err =>{
        console.log(err);
        });
      },
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
      showDetail(x=1){
      Swal.fire({
        text: "name : \t" + x + "prenom : " + x,
        title: "Document detail",
        confirmButtonText: 'Ok',
        imageUrl: "https://www.cti-commission.fr/wp-content/uploads/2018/01/my-documents-png-image-24592.png",
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Custom image',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
    })
    },
    },created(){
      this.getAllDocuments();
      this.getUserDetails();
    }
}
</script>
