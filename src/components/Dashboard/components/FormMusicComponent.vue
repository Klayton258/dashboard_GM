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
  <!-- {{formToUpdate }} -->
  <div v-if="formToUpdate !=null" class="col-12 img-container">
    <img :src="'http://127.0.0.1:8000/images/music_covers/'+formToUpdate.m_cover" alt="cover" class="image">
  </div>
  <div class="col-md-2">
    <label for="inputEmail4" class="form-label">Titulo</label>
    <input v-if="formToUpdate == null" v-model="m_title" maxlength="30" class="form-control">
    <input v-if="formToUpdate !=null" v-model="formToUpdate.m_title"  maxlength="30" class="form-control">
    
  </div>
  <div class="col-md-2">
    <label for="inputPassword4" class="form-label">Artista</label>
     <input v-if="formToUpdate == null" v-model="m_artist" maxlength="25" class="form-control">
     <input v-if="formToUpdate != null" v-model="formToUpdate.m_artist" maxlength="25" class="form-control">
  </div>
  <div class="col-4">
    <label for="inputAddress" class="form-label">Youtube Link</label>
    <input v-if="formToUpdate == null" v-model="youtube" class="form-control" placeholder="https://example" required>
    <input v-if="formToUpdate !=null" v-model="formToUpdate.youtube" class="form-control" placeholder="" required>
  </div>
  <div class="col-md-4">
    <label for="inputCity" class="form-label">audiomack Link</label>
    <input v-if="formToUpdate == null" class="form-control" v-model="audiomack" placeholder="https://example" required>
    <input v-if="formToUpdate != null" class="form-control" v-model="formToUpdate.audiomack" placeholder="" required>
  </div>
 <div class="col-md-4">
    <label for="inputCity" class="form- label">Soundcloud Link </label>
    <input v-if="formToUpdate == null" class="form-control" v-model="soundcloud" placeholder="https://example" required>
    <input v-if="formToUpdate != null" class="form-control" v-model="formToUpdate.soundcloud" placeholder="" required>
  </div>
  <div class="col-md-4">
    <label for="inputCity" class="form-label">Spotify Link</label>
    <input v-if="formToUpdate == null" class="form-control" v-model="spotify" placeholder="https://example" required>
    <input v-if="formToUpdate != null" class="form-control"  v-model="formToUpdate.spotify" placeholder="" required>
  </div>
  <div class="col-md-4">
    <label for="inputZip" class="form-label">Escolha a imagem</label>
    <input type="file" class="form-control" id="file" ref="file" v-on:change="handleFilesUpload()" required>
  </div>
  
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" v-model="m_album" type="checkbox" id="gridCheck">
      <label class="form-check-label"  for="gridCheck">
        Is Album/Ep
      </label>
    </div>
  </div>

  <div v-if="!this.$route.params.id">
    <div class="col-12">
      <button type="submit" @click.prevent="salvar" class="btn btn-primary">Salvar</button>
    </div>
  </div>
  <div v-if="this.$route.params.id" class="row mt-2">
    <div class="col-1">
      <button type="submit" @click.prevent="updateMusic" class="btn btn-primary">Editar</button>
    </div>
    <div class="col-1">
      <button type="submit" @click.prevent="deleteMusic" class="btn btn-danger">Delete</button>
    </div>
  </div>
</form>
</div>

</template>

<script>
import axios from 'axios'

name: "FormMusicComponent"

export default {
   props:{
    formToUpdate: Object
  },

data(){
  return{
  m_artist: '',
  m_title: '',
  m_cover: '',
  m_album: '',
  youtube:'',
  soundcloud:'',
  spotify:'',
  audiomack:'',

  errors:[],
  success:[],
  }
},

methods:{
  salvar(){
    this.errors = [];
    
      let formData = new FormData();

      if (!this.m_title) {
        this.errors.push('Music title is required.');
      }
      if (!this.m_artist) {
        this.errors.push('Artist name is required.');
      }
      if(this.m_album){
        console.log(this.m_album)
      }else{
        this.m_album = false
      }
      if(!this.m_cover){        
        this.errors.push('Cover is required.');
      }
      if (!this.errors.length) {

      formData.append('m_title',this.m_title)
      formData.append('m_artist',this.m_artist)
      formData.append('m_album',this.m_album)
      formData.append('youtube',this.youtube)
      formData.append('audiomack',this.audiomack)
      formData.append('spotify',this.spotify)
      formData.append('soundcloud',this.soundcloud)

    formData.append('m_cover', this.m_cover);

    axios.post('http://127.0.0.1:8000/api/newsong', formData,
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
    }
  })
  .catch(function (error) {
    console.log(error);
  });

        return true;  
      }
    },

   handleFilesUpload(){
        this.m_cover = this.$refs.file.files[0];
        // console.log(this.m_cover)
      },

      async deleteMusic(){
        axios.defaults.withCredentials=true
        await axios.delete(`http://127.0.0.1:8000/api/delete/${this.$route.params.id}`, {headers:{'Authorization': `Bearer ${this.token}` }, withCredentials: true}).then((response)=>{
          setTimeout(()=>{
            
            this.$router.push({name: 'clients'})
          },1000)
        }).catch((errors)=>{
          console.log(errors.response)
        })
    },
    async updateMusic(){
      let formData = new FormData();

      formData.append('m_title',this.formToUpdate.m_title)
      formData.append('m_artist',this.formToUpdate.m_artist)
      formData.append('m_album',this.formToUpdate.m_album)
      formData.append('youtube',this.formToUpdate.youtube)
      formData.append('audiomack',this.formToUpdate.audiomack)
      formData.append('spotify',this.formToUpdate.spotify)
      formData.append('soundcloud',this.formToUpdate.soundcloud)

      if(this.m_cover != null){

        formData.append('m_cover', this.m_cover);
      }
      await axios.post(`http://127.0.0.1:8000/api/updatesong/${this.$route.params.id}`,formData, 
      {headers:{
        'Authorization': `Bearer ${this.token}` }
        
      }).then((response)=>{
        setTimeout(()=>{
          alert(response.data.msg)
          this.$router.push({name:'editMusic', params:{id:this.$route.params.id}})
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