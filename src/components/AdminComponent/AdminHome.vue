<template>
    <RouterLink to="/ListUser" class="nav-item">
      <div class="btn btn-five">
        <span>Users List</span>
      </div>
    </RouterLink>
    
    <RouterLink to="/ListRole" class="nav-item">
      <div class="btn btn-five">
        <span>List of Roles</span>
      </div>
    </RouterLink>
    
    <RouterLink to="/ListDepartement" class="nav-item">
      <div class="btn btn-five">
        <span>List of Departments</span>
      </div>
    </RouterLink>
    
    <RouterLink to="/ListDirection" class="nav-item">
      <div class="btn btn-five">
        <span>List of Directions</span>
      </div>
    </RouterLink>
    
    <RouterLink to="/ListCategory" class="nav-item">
      <div class="btn btn-five">
        <span>List of Categories</span>
      </div>
    </RouterLink>
    
    <RouterLink to="/ListSubCategory" class="nav-item">
      <div class="btn btn-five">
        <span>List of Subcategories</span>
      </div>
    </RouterLink>
  

  
</template>

<script>
export default {
  name: 'AdminHome'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

* {
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  width: 70%;
  height: 5.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}


.btn {
  position: relative;
  color: white;
  font-weight: 600;
  font-size: 22px;
  background-color: rgba(230, 193, 134, 0.7);
  width: 50%;
  height: 74px;
  line-height: 74px;
  border-radius: 0.5rem;
  transition: all 0.3s;
}
.nav-item{
  text-decoration: none;
}

.btn span {
    transition: all 0.3s;
    transform: scale(1, 1);
  }

.btn::before, .btn::after {
  content: '';
  position: absolute;
  transition: all 0.3s;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* BTN FIVE */
.btn-five::before {
  transition: transform 0.15s, 0.15s border-radius 0.15s;
  opacity: 0;
  background: rgba(255, 255, 255, 0.1);
  transform: scale(0.1, 0.1);
  border-radius: 50%;
}

.btn-five:hover::before {
  opacity: 1;
  transform: scale(1, 1);
  border-radius: 0;
}

</style>
