<template>

<div class="main-table">
  <p class="alert alert-danger" role="alert" v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error.id" class="col-mb-2">{{ error }}</li>
    </ul>
  </p>
  <!-- <p div class="alert alert-success" role="alert" v-if="success.length">
    <ul>
     <li v-for="succes in success" :key="succes.id" class="col-mb-2">{{ succes }}</li>
    </ul>
  </p> -->

<form class="row g-3">
  <div class="col-md-4">
    <label for="inputEmail4" class="form-label">Name</label>
    <input v-model="formData.name" maxlength="30" class="form-control">
    
  </div>
  <div class="col-md-4">
    <label for="inputPassword4" class="form-label">Email</label>
     <input v-model="formData.email" class="form-control">
  </div>
  <div class="col-4">
    <label for="inputAddress" class="form-label">Username</label>
    <input v-model="formData.username" class="form-control">
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">Password</label>
    <input type="password" class="form-control" id="inputPassword2" v-model="formData.password">
  </div>
  <div class="col-6">
    <label class="form-label" for="exampleFormControlSelect1">Permission</label>
    <select class="form-control" v-model="formData.role_id" id="exampleFormControlSelect1">
      <option>Editor</option>
      <option>Admin</option>
    </select>
  </div>
  
  <div class="col-12">
    <button type="submit" @click.prevent="salvar" class="btn btn-primary">Salvar</button>
  </div>
</form>
</div>

</template>

<script>
import axios from 'axios'

name: "FormArtistComponent"

export default {
data(){
  return{
 formData:{
  name: '',
  email: '',
  username: '',
  password: '',
 },

  errors:[],
  success:[]


  }
},

methods:{
  salvar(){
    this.errors = [];
      if (!this.formData.name) {
        this.errors.push('Name is required.');
      }
      if (!this.formData.email) {
        this.errors.push('Email is required.');
      }
      if(!this.formData.password){        
        this.errors.push('Password is required.');
      }
      if(!this.formData.role_id){        
        this.errors.push('Permission is required.');
      }
      if (this.formData.role_id = "Admin") {
        this.formData.role_id = 2;
      } else {
        this.formData.role_id = 1;
      }
        console.log(this.formData.role_id)
      if (!this.errors.length) {

    axios.post('http://127.0.0.1:8000/api/newuser', this.formData, {headers:{
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }})
  .then(function (response) {
    console.log(response.data);

    // if (response.data.code < 400){
    //   alert(response.data.msg);      
    // }
  })
  .catch(function (error) {
    console.log(error);
  });

        return true;  
      }
    },
  }

}
</script>

<style lang="scss" scoped>
.validations{
  li{
    color: red;
  }
}
</style>