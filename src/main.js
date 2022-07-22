import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueJwtDecode from "vue-jwt-decode";
import Swal from 'sweetalert2/dist/sweetalert2.js'


setInterval(function(){ 
    try{
        let token = localStorage.getItem('token');
    let decode = VueJwtDecode.decode(token);
    var currentDateTime = new Date().getTime() / 1000;
    
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(decode.exp);
    if(Math.round(d.getTime() / 1000 - currentDateTime) == 60){
        Swal.fire({
            title: 'Your session will expire in 1 minute',
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    if(Math.round(d.getTime() / 1000 - currentDateTime) == 30){
        Swal.fire({
            title: 'Your session will expire in 30 seconds',
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    if(d.getTime() / 1000 < currentDateTime){
        localStorage.removeItem('token');
        window.location.href = "http://localhost:8081/Signin"
        console.log("expira c bon")
    }else{
        console.log("mazel ma expirech")
    }
    }
    catch(error){
        return ""
    }
}, 1000);

createApp(App).use(router,VueSweetalert2).mount('#app')
