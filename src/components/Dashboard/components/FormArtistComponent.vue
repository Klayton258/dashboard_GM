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
  <div v-if="artistToUpdate !=null" class="col-12 img-container">
    <img :src="'http://127.0.0.1:8000/images/artist_image/'+artistToUpdate.artist_image" alt="cover" class="image">
    </div>
  <div class="col-md-4">
    <label for="inputEmail4" class="form-label">Titulo</label>
    <input v-if="artistToUpdate ==null"  v-model="artist_name" maxlength="30" class="form-control">
    <input v-if="artistToUpdate !=null"  v-model="artistToUpdate.artist_name" maxlength="30" class="form-control">
    
  </div>
  <div class="col-md-4">
    <label for="inputPassword4" class="form-label">Facebook Link</label>
     <input v-if="artistToUpdate ==null" v-model="artist_facebook" class="form-control">
     <input v-if="artistToUpdate !=null" v-model="artistToUpdate.artist_facebook" class="form-control">
  </div>
  <div class="col-4">
    <label for="inputAddress" class="form-label">Instagram Link</label>
    <input  v-if="artistToUpdate ==null" v-model="artist_instagram" class="form-control" placeholder="https://example" required>
    <input  v-if="artistToUpdate !=null" v-model="artistToUpdate.artist_instagram" class="form-control">
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">Twitter Link</label>
    <input  v-if="artistToUpdate ==null" class="form-control" v-model="artist_twitter" placeholder="https://example" required>
    <input  v-if="artistToUpdate !=null" class="form-control" v-model="artistToUpdate.artist_twitter">
  </div>
  <div class="col-md-6">
    <label for="inputZip" class="form-label">Escolha a imagem</label>
    <input type="file" class="form-control" id="file" ref="file" v-on:change="handleFilesUpload()" required>
  </div>
  <div class="col-md-12">
    <label for="textarea" class="form-label">Bio</label>
    <textarea v-if="artistToUpdate ==null"  rows="3" class="form-control" v-model="artist_bio" textarea/>
    <textarea v-if="artistToUpdate !=null"  rows="3" class="form-control" v-model="artistToUpdate.artist_bio" textarea/>
  </div>
  
 <div v-if="!this.$route.params.id">
    <div class="col-12">
      <button type="submit" @click.prevent="salvar" class="btn btn-primary">Salvar</button>
    </div>
  </div>
  <div v-if="this.$route.params.id" class="row mt-2">
    <div class="col-1">
      <button type="submit" @click.prevent="updateArtist" class="btn btn-primary">Editar</button>
    </div>
    <div class="col-1">
      <button type="submit" @click.prevent="deleteArtist" class="btn btn-danger">Delete</button>
    </div>
  </div>
</form>
</div>

</template>

<script>
import axios from 'axios'

name: "FormArtistComponent"

export default {
  props:{
    artistToUpdate: Object
  },
data(){
  return{
  artist_name: '',
  artist_image: '',
  artist_bio: '',
  artist_facebook: '',
  artist_instagram:'',
  artist_twitter:'',
  

  errors:[],
  success:[],
  
  token: localStorage.getItem('token')

  }
},

methods:{
  salvar(){
    this.errors = [];
    
      let formData = new FormData();

      if (!this.artist_name) {
        this.errors.push('Artist name is required.');
      }
      if (!this.artist_bio) {
        this.errors.push('Bio is required.');
      }
      if(!this.artist_image){        
        this.errors.push('Cover is required.');
      }
      if (!this.errors.length) {

      formData.append('artist_name',this.artist_name)
      formData.append('artist_bio',this.artist_bio)
      formData.append('artist_facebook',this.artist_facebook)
      formData.append('artist_instagram',this.artist_instagram)
      formData.append('artist_twitter',this.artist_twitter)

    formData.append('artist_image', this.artist_image);

    axios.post('http://127.0.0.1:8000/api/newartist', formData,
  {
    headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'multipart/form-data'
    }
  })
  .then(function (response) {
    console.log(response.data);

    if (response.data.code < 400){
      alert(response.data.msg);    
      this.$router.push({name: 'report'})  
    }
  })
  .catch(function (error) {
    console.log(error);
    
    this.$router.push({name: 'report'})
  });
        return true;  
      }
    },

   handleFilesUpload(){
        this.artist_image = this.$refs.file.files[0];
        console.log(this.artist_image)
      },

      async deleteArtist(){
        axios.defaults.withCredentials=true
        await axios.delete(`http://127.0.0.1:8000/api/deleteArtist/${this.$route.params.id}`, {headers:{'Authorization': `Bearer ${this.token}` }, withCredentials: true}).then((response)=>{
          setTimeout(()=>{
            
            this.$router.push({name: 'report'})
          },1000)
        }).catch((errors)=>{
          console.log(errors.response)
        })
    },
    async updateArtist(){
      let formData = new FormData(); 

      formData.append('artist_name',this.artistToUpdate.artist_name)
      formData.append('artist_bio',this.artistToUpdate.artist_bio)
      formData.append('artist_facebook',this.artistToUpdate.artist_facebook)
      formData.append('artist_instagram',this.artistToUpdate.artist_instagram)
      formData.append('artist_twitter',this.artistToUpdate.artist_twitter)



      if(this.artist_image != null){
        
        formData.append('artist_image', this.artist_image);
      }
      await axios.post(`http://127.0.0.1:8000/api/updateArtist/${this.$route.params.id}`,formData, 
      {headers:{
        'Authorization': `Bearer ${this.token}` },
        'Content-Type': 'multipart/form-data'
        
      }).then((response)=>{
        setTimeout(()=>{
          alert(response.data.msg)
          this.$router.push({name:'editArtist', params:{id:this.$route.params.id}})
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