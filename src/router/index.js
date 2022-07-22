import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Signin from '../components/Signin.vue'
import Confirm_email from '../components/Confirm_email.vue'
import ResetPassword from '../components/ResetPassword.vue'
import PageNotFound from '../components/PageNotFound.vue'
import ListUser from '../components/AdminComponent/User Management/ListUser.vue'
import AdminHome from '../components/AdminComponent/AdminHome.vue'
import ListCategory from '../components/AdminComponent/Category Management/ListCategory.vue'
import ListDepartement from '../components/AdminComponent/Departement Management/ListDepartement.vue'
import ListDirection from '../components/AdminComponent/Direction Management/ListDirection.vue'
import ListRole from '../components/AdminComponent/Role Management/ListRole.vue'
import ListSubCategory from '../components/AdminComponent/SubCategory Management/ListSubCategory.vue'
import AddUser from '../components/AdminComponent/User Management/AddUser.vue'
import UpdateUser from '../components/AdminComponent/User Management/UpdateUser.vue'
import AddDirection from '../components/AdminComponent/Direction Management/AddDirection.vue'
import UpdateDirection from '../components/AdminComponent/Direction Management/UpdateDirection.vue'
import AddCategory from '../components/AdminComponent/Category Management/AddCategory.vue'
import UpdateCategory from '../components/AdminComponent/Category Management/UpdateCategory.vue'
import VueJwtDecode from "vue-jwt-decode";


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Signin',
    name: 'Signin',
    component: Signin,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/AddUser',
    name: 'AddUser',
    component: AddUser
  },
  {
    path: '/UpdateUser',
    name: 'UpdateUser',
    component: UpdateUser
  },
  {
    path: '/Confirm_email',
    name: 'Confirm_email',
    component: Confirm_email,
  },
  {
    path: '/ResetPassword',
    name: 'ResetPassword',
    component: ResetPassword
  },
  { 
    path: '/AdminHome', 
    name : 'AdminHome',
    component: AdminHome 
  },
  { 
    path: '/ListUser', 
    name : 'ListUser',
    component: ListUser 
  },
  { 
    path: '/ListCategory', 
    name : 'ListCategory',
    component: ListCategory 
  },
  { 
    path: '/ListDepartement', 
    name : 'ListDepartement',
    component: ListDepartement 
  },
  { 
    path: '/ListDirection', 
    name : 'ListDirection',
    component: ListDirection 
  },
  { 
    path: '/ListRole', 
    name : 'ListRole',
    component: ListRole 
  },
  { 
    path: '/ListSubCategory', 
    name : 'ListSubCategory',
    component: ListSubCategory 
  },
  {
    path: '/AddDirection',
    name: 'AddDirection',
    component: AddDirection
  },
  {
    path: '/UpdateDirection',
    name: 'UpdateDirection',
    component: UpdateDirection
  },
  {
    path: '/AddCategory',
    name: 'AddCategory',
    component: AddCategory
  },
  {
    path: '/UpdateCategory',
    name: 'UpdateCategory',
    component: UpdateCategory
  },
  { 
    path: '/:pathMatch(.*)*', 
    name : '404NotFound',
    component: PageNotFound 
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(localStorage.getItem('token') != null){
    let token = localStorage.getItem('token');
    let decode = VueJwtDecode.decode(token);
    if (requiresAuth && decode.activate_acc==0) 
      next('/Confirm_email')
  }

  // Check for protected route
  if (requiresAuth && localStorage.getItem('token')==null) 
    next('/Signin')

  if (requiresAuth && !localStorage.getItem('token')==null) 
    next('/')


  else next();
});



export default router
