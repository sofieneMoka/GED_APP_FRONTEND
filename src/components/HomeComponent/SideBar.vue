<template>
  <div
    class="sidebar open"
    :style="cssVars"
  >

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
                  v-for="subcategory in subcategories.SubCategories" :key='subcategory.id'>
                    <li class="li_Subcategory">
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
</template>

<style>
  /* Google Font Link */
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
    position: relative;
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
import axios from 'axios';

  export default {
    name: 'SideBar',
    data(){
      return {
          categories:[],
          subcategories:[],
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
      getAllSubCategories(){
        const path = `http://127.0.0.1:5000/GetAllSubCategory`
        axios.get(path).then((res) => {
          this.subcategories=res.data
        })
        .catch(err =>{
        console.log(err);
        });
      },
    },
    created(){
      this.getAllCategories();
      this.getAllSubCategories();
      console.log(this.subcategories)
    }
  }
</script>