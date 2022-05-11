<template>

<div class="main">
  <div class="login">
    <div class="login-page">
         <form>
            <div class="mb-2">
              <h3>Login</h3>
            </div>
           <div class="mb-3">
             <!-- <label for="exampleInputEmail1" class="form-label">username</label> -->
             <input v-model="formData.username" class="form-control" placeholder="username">
             <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
           </div>
           <div class="mb-3">
             <!-- <label for="exampleInputPassword1" class="form-label">password</label> -->
             <input type="password" class="form-control" id="inputPassword2" placeholder="password" v-model="formData.password">
           </div>
             <!-- <div class="mb-3 form-check">
             <input type="checkbox" class="form-check-input" id="exampleCheck1">
             <label class="form-check-label" for="exampleCheck1">Check me out</label>
           </div> -->
           <button type="submit" @click.prevent="login" class="btn btn-info">Login</button>
         </form>
    </div>
  </div>
</div>

</template>

<script>
import axios from "axios"

export default {
  name: 'LoginComponent',
  data(){
    return{
      formData:{
        username:'',
        password:'',
        device_name:'browser'
      },
       token: ''
    }
  },
  methods:{
    async login(){

       let settingCredentialsConfig = {
            withCredentials:true,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials':true
            }
          }
          let self = this;
      
          // VueCookies.set('user','klayton',60 * 60 * 12)
    await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then((response) =>{
     axios.post('http://127.0.0.1:8000/api/login', this.formData, settingCredentialsConfig).then(function (response){
          if(response.data != null){
            localStorage.setItem('token', response.data);
              self.$router.push({name:'home'});
          }

              }).catch(function (errors){
                  // console.log(errors)
            })  
        });
    },
  },
}
</script>

<style lang="scss" src="./style.scss" scoped />