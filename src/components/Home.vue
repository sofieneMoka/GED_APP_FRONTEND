<template>

<div id="main">
 <div id="menu">
  <SideBar/>
 </div>


  <div id="Filtrage">
 Partie Filtrage
</div>

 <div id="contenu">
  <TableList/>
 </div>
</div>

<div id="footer">
 Pied de Page
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
}
#main {
max-width:960px;
margin:auto;
}
#contenu {
margin-left:20px;
}
#footer {
background-color:#669933;
text-align:center;
clear:both;
}
</style>


<script>
import TableList from '../components/TableList.vue';
import SideBar from '../components/SideBar.vue';
import VueJwtDecode from "vue-jwt-decode";


export default {
  name: 'HoMe',
  components: {
    TableList,
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
