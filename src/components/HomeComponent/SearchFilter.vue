<template>
        <h3>Search for document</h3>
    <div class="container">
        <form @submit.prevent="SearchDocument">
        <div class="form-field"> 
            <div class="form-field-item">
                <input type="text" placeholder="Name..." v-model="name" required>
            </div>
            <div class="form-field-item">
                <input type="text" placeholder="Creator..." v-model="creatorname">
            </div>
            <div class="form-field-item">
            <select name="nameCategory" id="role-select" class="input" v-model="nameCategory" @change="GetListSubCategoryByCategory($event.target.value)" required>
                <option value="" disabled selected>Select category</option>
                <option 
                    v-for="category in categories.Categories" :key='category.id'
                    v-bind:value="category.name" >{{category.name}}</option>
            </select>
            </div>
            <div class="form-field-item">
            <select name="nameSubCategory" class="input" v-model="nameSubCategory" required>
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
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
}
</style>


<script>
import axios from 'axios';

export default {
  name: 'SearchFilter',
  
  data(){
    return {
        nameCategory:"",
        subcategories:[],
        categories:[],
        type:'text'
      };
    },
    methods:{
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
      this.nameCategory="aaaa"
    }
}
</script>
