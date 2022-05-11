<template>
  <div class="sidebar">
     <div class="header row">
         <i class="fa fa-user-circle" style="font-size:50px; margin-bottom:40px"></i>
         <div class="username">Name: {{userLoged.name}}</div>
         <div class="username">permission: {{permission}}</div>
     </div>
     <div class="menu">
         <ul>
             <li><router-link :to="{name: 'home'}"><i class="icon fa fa-laptop-house"></i>Home</router-link></li>
             <li><router-link :to="{name: 'products'}"><i class="icon fa fa-box icon"></i>Slides</router-link></li>
             <li><router-link :to="{name: 'clients'}"><i class="icon fa fa-users"></i>Musics</router-link></li>
             <li><router-link :to="{name: 'reports'}"><i class="icon fa fa-list-alt"></i>Artists</router-link></li>
             <li><router-link :to="{name: 'management'}"><i class="icon fa fa-tasks"></i>Management</router-link></li>
         </ul>
     </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
name: 'SideBarComponent',

  data(){
      return{
        token: localStorage.getItem('token'),
        userLoged:[],
        permission:''
    }
  },
  methods:{
     async getCurrentUser(){
        await  axios.get('/api/user', {headers:{'Authorization': `Bearer ${this.token}`}}).then((response)=>{
        this.userLoged = response.data
        localStorage.setItem('userLoged',[this.userLoged])
        localStorage.setItem('role', response.data.role_id)

        if(this.userLoged.role_id ==1){
            this.permission = "Editor"
        }else{
            this.permission = "Admin"
        }
      }).catch((errors)=>{
          console.log(errors)
      })
    }
  },
  created(){
      this.getCurrentUser()
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600&display=swap'); //font-family: 'Rajdhani', sans-serif;
.sidebar{
    height: 100vh;
    width: 100%;
    align-content: center;
    font-family: 'Rajdhani', sans-serif;

    .header{
        text-align: center;
        margin-top: 50px;
        justify-items: center;
        width: 100%;
        color: white;
    }
    .menu{
        margin-top: 30px;
        width: 100%;
    }
    ul{
        padding-left: 30px;
        list-style-type: none;
        font-size: 20px;
    }
    li{
        padding: 10px;

        .icon{
            font-size: 30px;
            padding-right: 20px;
        }
    }
    ul a:hover{
        color: rgb(179, 179, 179);
        font-size: 25px;
    }
    a{
        color: white;
        text-decoration-line: none;
    }
}
</style>