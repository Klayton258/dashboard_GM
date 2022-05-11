<template>

<div class="main-table">
  <p class="alert alert-danger" role="alert" v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error.id" class="col-mb-2">{{ error }}</li>
    </ul>
  </p>
  <div div class="alert alert-success text-center" role="alert" v-if="this.success !='' ">
    <div>
     <p class="col-mb-2 text-center">{{ this.success }}</p>
    </div>
  </div>

<form class="row g-3">
    <div v-if="slideForm !=null" class="col-12 img-container">
    <img :src="'http://127.0.0.1:8000/images/slide_covers/'+slideForm.slide_cover" alt="cover" class="image">
    </div>

  <div class="col-md-4">
    <label for="inputEmail4" class="form-label">Titulo Do slide</label>
    <input v-if="slideForm == null" v-model="slide_title" maxlength="30" class="form-control" >
    <input v-if="slideForm != null" v-model="slideForm.slide_title" class="form-control" >
    
  </div>
  <div class="col-md-4">
    <label for="inputPassword4" class="form-label">Descricao</label>
     <input v-if="slideForm == null" v-model="description" maxlength="25" class="form-control">
     <input v-if="slideForm != null" v-model="slideForm.description" class="form-control">
  </div>
  <div class="col-4">
    <label for="inputAddress" class="form-label">Link</label>
    <input v-if="slideForm == null" v-model="link_direct" class="form-control" placeholder="https://example" required>
    <input v-if="slideForm != null" v-model="slideForm.link_direct" class="form-control" >
  </div>
 
  <div class="col-md-6">
    <label for="inputZip" class="form-label">Escolha a imagem</label>
    <input type="file" class="form-control" id="file" ref="file" v-on:change="handleFilesUpload()" required>
  </div>

  <div v-if="!this.$route.params.id">
    <div class="col-12">
      <button type="submit" @click.prevent="salvar" class="btn btn-primary">Salvar</button>
    </div>
  </div>
  <div v-if="this.$route.params.id" class="row mt-2">
    <div class="col-1">
      <button type="submit" @click.prevent="updateSlide" class="btn btn-primary">Editar</button>
    </div>
    <div class="col-1">
      <button type="submit" @click.prevent="deleteSlide" class="btn btn-danger">Delete</button>
    </div>
  </div>
</form>
</div>

</template>

<script>
import axios from 'axios'

name: "FormComponent"

export default {
  
  props:{
    slideForm: Object
  },
data(){
  return{
  slide_title: '',
  slide_cover: '',
  link_direct: '',
  description:'',
  
  errors:[],
  success:''


  }
},

methods:{
  salvar(){
    this.errors = [];

      if (!this.slide_title) {
        this.errors.push('Slide title required.');
      }
      if (!this.slide_cover){
        this.errors.push('Cover is required.');
      }
      if (!this.errors.length) {

    let formData = new FormData();
      formData.append('slide_title',this.slide_title)
      formData.append('link_direct',this.link_direct)
      formData.append('description',this.description)

    formData.append('slide_cover', this.slide_cover);

    axios.post('/api/newslide', formData,
  {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(function (response) {
    console.log(response.data);

    if (response.data.code < 400){
      alert(response.data.msg);      
      this.success = response.data.msg
    }
  })
  .catch(function (error) {
    console.log(error);
  });

        return true;  
      }
    },

   handleFilesUpload(){
        this.slide_cover = this.$refs.file.files[0];
        console.log(this.slide_cover)
      },

       async deleteSlide(){
        axios.defaults.withCredentials=true
        await axios.delete(`http://127.0.0.1:8000/api/deleteSlide/${this.$route.params.id}`, {headers:{'Authorization': `Bearer ${this.token}` }, withCredentials: true}).then((response)=>{
          setTimeout(()=>{
            
            this.$router.push({name: 'products'})
          },1000)
        }).catch((errors)=>{
          console.log(errors.response)
        })
    },
    async updateSlide(){
      let formData = new FormData();

      formData.append('slide_title',this.slideForm.slide_title)
      formData.append('link_direct',this.slideForm.link_direct)
      formData.append('description',this.slideForm.description)


      if(this.slide_cover != null){

        formData.append('slide_cover', this.slide_cover);
      }
      await axios.post(`http://127.0.0.1:8000/api/updateslide/${this.$route.params.id}`,formData, 
      {headers:{
        'Authorization': `Bearer ${this.token}` },
        'Content-Type': 'multipart/form-data'
        
      }).then((response)=>{
        setTimeout(()=>{
          alert(response.data.msg)
          this.$router.push({name:'editSlide', params:{id:this.$route.params.id}})
        },1000)

      }).catch((errors)=>{
        console.log(errors.response)
      })
      
    }
  }

}
</script>

<style lang="scss" scoped>
.validations{
  li{
    color: red;
  }
}
.img-container{
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
.image{
  widows: 200px;
  height: 200px;
}
}
</style>