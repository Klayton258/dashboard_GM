<template>
  <div class="nav-content">
     <div class="title"><i class="fa-brands fa-html5"></i>  LOGO</div>
     <a href="#" @click="logout" class="logout"><i class="fa fa-sign-out-alt"></i>logout</a>
  </div>
</template>

<script>
import axios from 'axios'

export default {
name: 'NavBarComponent',
data(){
return{
  token: localStorage.getItem('token') 
}
},

methods:{
 async logout(){
    console.log(this.token)

      let self = this;

      await axios.post('http://127.0.0.1:8000/api/logout', {headers:{'Authorization': `Bearer ${this.token}`}, withCredentials: true}).then((response)=>{
        setTimeout(()=>{
          localStorage.removeItem('token')
          localStorage.removeItem('role')
            this.$router.push({name:'login'})

        },1000)

    }).catch((errors)=>{
      console.log(errors.response)
    })

    }
},

}
</script>

<style lang="scss" scoped>
.nav-content{
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;

  .title{
    color: white;
    font-size: 24px;
  }
  .logout{
    color: white;
    font-size: 20px;
  }
  a{
    text-decoration-line: none;
  }
}
</style>