<template>

<div id="main">
 <div id="menu">
  <SideBar/>
 </div>


  <div id="Filtrage">
 Partie Filtrage
</div>

 <div id="contenu">
  <DocumentsList/>
 </div>
</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Filtrage, #menu, #contenu, #footer {
padding:1px 0;
}
#Filtrage {
background-color:#FF9900;
text-align:center;
justify-content: center;
margin-left: 250px;
}
#main {
max-width:960px;
margin:auto;
}
#contenu{
  margin-left: 250px;
}
</style>


<script>
import DocumentsList from './DocumentsList.vue';
import SideBar from './SideBar.vue';
import VueJwtDecode from "vue-jwt-decode";


export default {
  name: 'HoMe',
  components: {
    DocumentsList,
    SideBar
  },
  data(){
    return {
      user:{}
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
    }
  },
  mounted(){
    this.getUserDetails();
  }
};
</script>
