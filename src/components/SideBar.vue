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

          <span
            v-for="(menuItem, index) in menuItems"
            :key="index"
          >
            <li v-on:click="seen = !seen">
              <a :href="menuItem.link">
                <i class="bx bx-folder" />
                <span class="Category_name">{{ menuItem.name }}</span>
              </a>
            </li>
            <div v-if="seen">
                <li>
                    <span class="Subcategory_name">aaaa{{ menuItem.name }}</span>
                </li>
                <li>
                    <span class="Subcategory_name">bbbbb</span>
                </li>
            </div>
          </span>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SideBar',
    data(){
        return{
            seen:false
        }
    },
    props: {

      //! Menu items
      menuItems: {
        type: Array,
        default: () => [
          {
            link: '#',
            name: 'Dashboard',
            tooltip: 'Dashboard',
            icon: 'bx-grid-alt',
          },
          {
            link: '#',
            name: 'User',
            tooltip: 'User',
            icon: 'bx-user',
          },
          {
            link: '#',
            name: 'Messages',
            tooltip: 'Messages',
            icon: 'bx-chat',
          },
          {
            link: '#',
            name: 'Analytics',
            tooltip: 'Analytics',
            icon: 'bx-pie-chart-alt-2',
          },
          {
            link: '#',
            name: 'File Manager',
            tooltip: 'Files',
            icon: 'bx-folder',
          },
          {
            link: '#',
            name: 'Order',
            tooltip: 'Order',
            icon: 'bx-cart-alt',
          },
          {
            link: '#',
            name: 'Saved',
            tooltip: 'Saved',
            icon: 'bx-heart',
          },
          {
            link: '#',
            name: 'Setting',
            tooltip: 'Setting',
            icon: 'bx-cog',
          },
          {
            link: '#',
            name: 'Setting',
            tooltip: 'Setting',
            icon: 'bx-cog',
          },
          {
            link: '#',
            name: 'Setting',
            tooltip: 'Setting',
            icon: 'bx-cog',
          },
        ]
      }
    },
    methods:{
            toggleDropdown (event) {
                event.currentTarget.classList.toggle('is-active')
            }
        }
  }
</script>

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
    /* overflow-y: auto; */
    background-color: rgba(230, 193, 134, 0.4);
    /* padding: 6px 14px 0 14px; */
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
    left: calc(100% + 15px);
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
    background: rgb(240, 148, 10,0.4);
    padding-bottom: 50px;
  }
  .sidebar li a .Category_name {
    color: white;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    opacity: 1;
    pointer-events: auto;
    transition: 0.4s;
  }
  .sidebar li a:hover .Category_name,
  .sidebar li a:hover i {
    transition: all 0.5s ease;
    color: black;
  }
  .sidebar li i {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    border-radius: 12px;
  }
  .my-scroll-active {
    overflow-y: auto;
  }
  #my-scroll {
    overflow-y: auto;
  }
  #my-scroll::-webkit-scrollbar{
    display:none;
  }
</style>